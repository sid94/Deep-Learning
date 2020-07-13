import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";


class TweetCard extends React.Component{
    constructor(){
        super();
        this.state = {
            response: [],
            endpoint: "http://localhost:3000"
        };
    }

    componentDidMount(){
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connect', () => {
            console.log('Socket connected');
            socket.on('tweet', (data) => this.setState({response : [data]}));
        });
    }

    render(){
        const { response } = this.state;
        return (
            <React.Fragment>
                    {response
                        ?  <React.Fragment>
                                {response.map(obj => 
                                
                                <div class="tweet tweet-1">
                                    <div class="tweet-avatar-wrapper">
                                        <div class="avatar"></div>
                                    </div>
                                    <div class="tweet-wrapper">
                                        <span class="name">{obj.username}</span>
                                        <span class="handle">@{obj.twitterid}</span>
                                        <span class="timestamp">Mar 23, 2016</span>
                                        <span class="sentiment sentiment-pos">{obj.label}</span>
                                        <span class="copy">{obj.text}</span>
                                    </div>
                                </div>
                                
                                )}
                            </React.Fragment>
                        : <p>loading...</p>
                    }
            </React.Fragment>
        );
    }
}

export default TweetCard;