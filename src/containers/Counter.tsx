import {connect} from 'react-redux';
import {incrementCounter} from '../actions/IncrementCounter';

import * as React from 'react';

interface IProps{
  secondElapsed: number;
  increment: any;
}

class SimpleCounter extends React.Component<IProps,{}>{
  constructor(props: IProps){
    super(props);
  }

  private interval: number;

  componentDidMount(){
    this.interval = setInterval(() =>{
      this.props.increment();
     }, 1000);

  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
         Second elapsed {this.props.secondElapsed}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    secondElapsed: state.secondElapsed
  }
}

function mapDispatchToProps (dispatch){
  return {
    increment: () => dispatch(incrementCounter())
  }
}

export const Counter =  connect(mapStateToProps,mapDispatchToProps)(SimpleCounter);
