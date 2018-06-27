import React, { Component } from 'react';
import './interviewer-dashboard.css';
// import {Link} from 'react-router-dom';
// import fire from '../Fire';
// import Interviewer_Event from "../Interviewer_Event/Interviewer_Event";
class Interviewer_Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            recentEventArray: [
                // {
                //     startTime:"9:00am",
                //     endTime: "2.00pm",
                //     eventDate: "06/20/2018",
                //     eventName: "Angular walk-in",
                //     id: "01",
                //     isClosed: "false",
                //     location: "hyderabad",
                //     skill: "Angular",
                //     slots: [
                //         {
                //             endTime: "10.00am",
                //             id: "11",
                //             noOfInterviewsEnrolled: [
                //                 {
                //                     noOfInterviewsTaken: "15",
                //                     userid: "1"
                //                 }
                //             ],
                //             startTime: "9.00am"
                //         }

                //     ]
                // }
            ],
            upcomingEventArray : [
                
                    // startTime:"10:00am",
                    // endTime: "2.00pm",
                    // eventDate: "06/20/2018",
                    // eventName: "Angular walk-in",
                    // id: "01",
                    // isClosed: "false",
                    // location: "hyderabad",
                    // skill: "Angular",
                    // slots: [  
                    //     {
                    //         endTime: "10.00am",
                    //         id: "11",
                    //         noOfInterviewsEnrolled: [
                    //             {
                    //                 noOfInterviewsTaken: "15",
                    //                 userid: "1"
                    //             }
                    //         ],
                    //         startTime: "9.00am"
                    //     }

                    
                
            ]
        }
        this.check = this.check.bind(this);
    }
    signOut() {
        // fire.auth().signOut();
        // console.log(this.state.recevent);
    }
    componentDidMount() {
        const self = this;
        var recevent = {};
        var upevent = {};
        var i1 = 0, i2 = 0;
        var event = {};
        fetch("https://pythonreact-f7420.firebaseio.com/event.json").then(res => res.json())
            .then(function (data) {
                ///  console.log(data);
                var keys = Object.keys(data);
                for (var i = 0; i < keys.length; i++) {
                    var  k = keys[i];
                    var date = data[k].eventDate;
                    var d1 = date.split('/');
                    var gm = d1[0];
                    var gd = d1[1];
                    var gy = d1[2];

                    var d = new Date().toLocaleString();
                    d1 = d.split('/');
                    var cm = d1[0];
                    var cd = d1[1];
                    var cy = d1[2];
                    //  console.log(cd);


                    // if ((Math.abs(cm - gm) == 0 && ((cd -gd) <= 0)||((cd-gd) > -5))){
                        //recent events 
                        if(Math.abs(cm-gm)==0 &&  (gd-cd<-7  || gd-cd <=0))
                        {

                        recevent[i1] = data[k];
                        i1++;
                        console.log("recent");
                    }
                    else
                    {
                        //upcoming events
                        upevent[i2] = data[k];
                        i2++;
                        console.log("upcoming");

                    }

                }
                console.log(Object.keys(recevent).length);
                console.log(Object.keys(upevent).length);
                //console.log(recevent.size);
                for (var x = 0; x < Object.keys(recevent).length; x++) {
                    const recEventObj = {
                        id: x,
                    startTime: recevent[x].startTime,
                    endTime: recevent[x].endTime,
                    eventDate: recevent[x].eventDate,
                    eventName: recevent[x].eventName,
                    isClosed: recevent[x].isClosed,
                    location: recevent[x].location,
                    skill: recevent[x].skill,
                    slots: [
                        {
                            endTime: recevent[x].endTime,
                            id: x,
                            noOfInterviewsEnrolled: [
                                {
                                    noOfInterviewsTaken: recevent[x].noOfInterviewsEnrolled,
                                    userid: recevent[x].userid
                                }
                            ],
                            startTime: recevent[x].startTime

                        
                    }]
                    }
                    const joined = self.state.recentEventArray.concat(recEventObj);

                    self.setState({
                        recentEventArray: (joined)
                    });

                }
                for (var x = 0; x < Object.keys(upevent).length; x++) {
                    const upEventObj = {
                        id: x,
                   startTime: upevent[x].startTime,    
                    endTime:   upevent[x].endTime,
                    eventDate: upevent[x].eventDate,
                    eventName: upevent[x].eventName,
                    isClosed:  upevent[x].isClosed,
                    location:  upevent[x].location,
                    skill:     upevent[x].skill,
                    slots: [
                        {
                            endTime: upevent[x].endTime,
                            id: x,
                            noOfInterviewsEnrolled: [
                                {
                                    noOfInterviewsTaken: upevent[x].noOfInterviewsEnrolled,
                                    userid: upevent[x].userid
                                }
                            ],
                            startTime: upevent[x].startTime

                        
                    }]
                    }
                    const joined = self.state.upcomingEventArray.concat(upEventObj);
                    console.log(joined);

                    self.setState({
                        upcomingEventArray: (joined)
                    });

                }
                //console.log(self.state.recentEventArray);
                // this.check(recevent);
            }
            )





        //console.log(this.state.recentEventArray);
    }

    check(recent) {
        //console.log(recent);
    }
    
    
    render() {

        return (
            <div>
                <div  class="row">
                    <div id="ID_box_container"class="col-lg-9 line">
                        <h3 id="ID_rec1">Recent Events </h3>
                        <div class="row1">
                            {this.state.recentEventArray.map(function (data) {
                              
                              return (  <div id="ID_card" class="col-lg-3 box">
                                    <h3 id="ID_card_heading">{data.eventName}</h3>
                                    <h4 id="ID_card_date">{data.eventDate}</h4>
                                    <h4 id="ID_card_start_time">Start Time: <span id="ID_st">{data.startTime}</span></h4>
                                    <h4 id="ID_card_stop_time">End Time: <span id="ID_et">{data.endTime}</span></h4>
                                    <button id="ID_view_data" type="button" class="btn btn-lg btn-success"    >
                                    Click</button>
                                </div>)
                            }) }

                        </div>
                         <div  class="row">
                        <div id="ID_box_container"class="col-lg-9 line">
                        <h3 id="ID_rec1">Upcoming Events </h3>
                        <div class="rows">
                            {this.state.upcomingEventArray.map(function (data) {
                              
                              return (  <div id="ID_card" class="col-lg-3 box">
                                    <h3 id="ID_card_heading">{data.eventName}</h3>
                                    <h4 id="ID_card_date">{data.eventDate}</h4>
                                    <h4 id="ID_card_start_time">Start Time: <span id="ID_st">{data.startTime}</span></h4>
                                    <h4 id="ID_card_stop_time">End Time: <span id="ID_et">{data.endTime}</span></h4>
                                    <button id="ID_view_data"  type="button" class="btn btn-lg btn-success">click</button>
                                </div>)
                            }) }

                        </div>
                    </div>
                    </div>
                    <div class="line">
                        <div id="ID_points" class="col-lg-6">
                            <h2 id="ID_points_head"><i class="fas fa-certificate"></i> Points so far...</h2>
                            <div id="ID_tt_tm">
                                <span id="ID_tt">Total</span>
                                <span id="ID_tm">This Month</span>
                            </div>

                            <div id="ID_tt_tm_v">
                                <span id="ID_tt_v">193</span>
                                <span id="ID_tm_v">26</span>
                            </div>
                        </div>
                    </div>
                </div>







            </div>
            </div>
        );
    }
}

export default Interviewer_Dashboard;