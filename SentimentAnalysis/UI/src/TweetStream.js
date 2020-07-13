import React from "react";
import socketIOClient from "socket.io-client";


class TweetStream extends React.Component{
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
            <div>
                <div style={{ textAlign: "center"}}>
                    
                    {response
                        ?   <ul>
                                {response.map(obj => <li key={obj._id}>{obj.text}</li>)}
                            </ul>
                        : <p>loading...</p>
                    }

                </div>
            </div>
        );
    }
}

export default TweetStream;