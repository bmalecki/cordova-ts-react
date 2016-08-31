import {connect} from "react-redux";
import {incrementCounter} from "../actions/IncrementCounter";

import * as React from "react";

interface IProps {
  secondElapsed: number;
  increment: any;
}

class SimpleCounter extends React.Component<IProps, {}> {
  private interval: number;

  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.interval = setInterval(() => {
      this.props.increment();
     }, 1000);

  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
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
  };
}

function mapDispatchToProps (dispatch) {
  return {
    increment: () => dispatch(incrementCounter())
  };
}

export const Counter =  connect(mapStateToProps, mapDispatchToProps)(SimpleCounter);
