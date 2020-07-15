import React from 'react';


class TweetCard extends React.Component{
    constructor(){
        super();
        this.state = {
            name : 'TweetCard'
        }
    }
    render(){
        let { data } = this.props;
        let polarityClass = data.label === "POSITIVE" ? 'sentiment-pos': 
        data.label === "NEGATIVE" ? 'sentiment-neg': 'sentiment-neu'
        polarityClass += " sentiment"
        return(
            <React.Fragment>
                <div class="tweet tweet-1">
                    <div class="tweet-avatar-wrapper">
                        <div class="avatar"></div>
                    </div>
                    <div class="tweet-wrapper">
                        <span class="name">{data.username}</span>
                        <span class="handle">@{data.twitterid}</span>
                        <span class="timestamp">{new Date(data.timestamp).toLocaleTimeString()}</span>
                        <span class={polarityClass}>{data.label}</span>
                        <span class="copy">{data.text}</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TweetCard;