import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {TransitionGroup,CSSTransition} from "react-transition-group"; 
import TweetCard from "./TweetCard";


class TweetList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            endpoint: "http://localhost:3000",
            items : []
        };
    }

    componentDidMount(){
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connect', () => {
            console.log('Socket connected');
            socket.on('tweet', (data) => {
                let newList = [data].concat(this.state.items.slice(0, 15));
                this.setState({ items: newList });
            });
        });
        socket.on("disconnect", () => {
            socket.off("tweet");
            socket.removeAllListeners("tweet");
            console.log("Socket Disconnected");
        });
    }

    render(){
        const { items } = this.state;
        let itemCards = (
            <TransitionGroup>
                {
                    items.map((tweetData,i) => (
                        <CSSTransition key={i} timeout={500} classNames="item" >
                            <TweetCard key={i} data={tweetData} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        )

        let loading = (
            <div class="loader" alt="loading..."></div>
        )
        return (
            <React.Fragment>
                    {items.length > 0 ? itemCards : loading }
            </React.Fragment>
        );
    }
}

export default TweetList;