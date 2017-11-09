import React, { Component } from 'react';

class HelloWorld extends Component {
    constructor(props){
        super(props);
        this.state = {
            secondsElapsed: 0,
        };
    }
    
    tick(){
        this.setState({
             secondsElapsed : this.state.secondsElapsed + 1
        });
    }
     
    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
    } 

    componentWillUnmount(){
        this.clearInterval(this.interval);
    }

    render() {
        return (
            <div className="developer"> 
                <p>Developed by {this.props.name}</p>                 
                <h3>Time Elapsed on this page: {this.state.secondsElapsed}</h3>
            </div>
        );
    } 


}


export default HelloWorld;