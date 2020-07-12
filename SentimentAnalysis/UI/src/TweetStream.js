import React from "react";
import socketIOClient from "socket.io-client";


class TweetStream extends React.Component{
    constructor(){
        super();
        this.state = {
            response: false,
            endpoint: "http://localhost:3000"
        };
    }

    componentDidMount(){
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connect', () => {
            console.log('Socket connected');
            socket.on('tweet', (data) => this.setState({response : data}));
        });
    }

    render(){
        const { response } = this.state;
        return (
            <div>
                <h1>Sentiment Analysis for Twitter API</h1>
                <div style={{ textAlign: "center"}}>
                    {response
                        ? <p>
                            Tweet : {response}
                        </p>
                        : <p>Loading..</p>
                    }
                </div>
            </div>
        );
    }
}

export default TweetStream;