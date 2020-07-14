import React from 'react';
import axios from  'axios';
import {Pie} from 'react-chartjs-2';

class PieChart extends React.Component {
    constructor(){
        super();
        this.state = {
            Data: {}
        }
    }

    setData(){
        this.timer = setInterval(async ()=> {
            await axios.get('http://localhost:4000/getPolarity')
            .then(res => {
                console.log(res);
                let labelarr = [];
                let polarityCount  = [];
                res.data.map(obj => {
                    labelarr.push(obj._id);
                    polarityCount.push(parseInt(obj.count));
                });
                this.setState({
                    Data : {
                        labels : labelarr,
                        datasets : [
                            {
                                label : 'Polarity',
                                data : polarityCount,
                                backgroundColor : ['#068587', '#fc5b3f', '#6fb07f']
                            }
                        ]
                    }
                });
            })
            .catch( err => console.error(`Error : ${err}`))
        }, 5000);
    }

    componentDidMount(){
        this.setData()
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render(){
        return (
            <React.Fragment>
                <h1>Average Polarity</h1>
                <Pie
                    data={
                        this.state.Data
                    }
                />
            </React.Fragment>
        );
    }   
}

export default PieChart;
