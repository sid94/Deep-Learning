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

    async dataCall(){
        {
            await axios.get('http://localhost:4000/getPolarity')
            .then(res => {
                //console.log(res);
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
                    },
                    options: {
                        responsive: true,
                        legend: {
                            position: 'bottom',
                            labels: {
                                fontColor: "white",
                                boxWidth: 20,
                                padding: 20
                            }
                        }
                    }
                });
            })
            .catch( err => console.error(`Error : ${err}`))
        }
    }

    setData(){
        this.dataCall()
        this.timer = setInterval(async ()=> {
            this.dataCall()
        }, 30000);
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
                <h3>Average Polarity</h3>
                <div class="pie-position">
                <Pie
                    data={
                        this.state.Data
                    }
                />
                </div>
            </React.Fragment>
        );
    }   
}

export default PieChart;
