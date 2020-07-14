import React from "react";
import TweetList from "./TweetList";
import PieChart from "./PieChart";

class TweetWidget extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clearInterval: ""
        }
        this.stateHandler = this.stateHandler.bind(this)
        console.log(this.state.clearInterval)
    }

    stateHandler(timer){
        this.setState({
            clearInterval : timer
        })
        console.log(this.state.clearInterval)
    }


    render(){
        return (
            <div class="container-fluid">
                <h2>Real Time Sentiment Analysis on Student Visa Tweet</h2>
                <div class="row">
                    <div class="col-sm-8 col-style">
                        <div class="wrapper">
                            <TweetList timer={this.state.clearInterval}/>
                        </div>
                    </div>
                    <div class="col-sm-4 col-style">
                        <div class="pie-container">
                            <PieChart handler = {this.stateHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetWidget;