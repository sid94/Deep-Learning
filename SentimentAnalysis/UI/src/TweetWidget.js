import React from "react";
import TweetList from "./TweetList";
import PieChart from "./PieChart";

class TweetWidget extends React.Component{
    render(){
        return (
            <div class="container-fluid">
                <h2>Real Time Sentiment Analysis on Student Visa Tweet</h2>
                <div class="row">
                    <div class="col-sm-8 col-style">
                        <div class="wrapper">
                            <TweetList/>
                        </div>
                    </div>
                    <div class="col-sm-4 col-style">
                        <PieChart/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetWidget;