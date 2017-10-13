import React, { Component } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import { TweenMax } from "gsap";

import "./App.css";

const withFade = WrappedComponent => {
  return class Fade extends Component {
    componentWillEnter(callback) {
      const ele = this.boxRef;

      TweenMax.fromTo(
        ele,
        0.3,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, onComplete: callback }
      );
    }

    componentWillLeave(callback) {
      const ele = this.boxRef;
      TweenMax.fromTo(
        ele,
        0.3,
        { x: 0, opacity: 1 },
        { x: 100, opacity: 0, onComplete: callback }
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          boxRef={boxRef => {
            this.boxRef = boxRef;
          }}
        />
      );
    }
  };
};

class Box extends Component {
  constructor(props) {
    super(props);

    this.boxRef = this.props.boxRef;
    this.props = this.props.rest;
  }

  render() {
    return <div className="box" ref={this.boxRef} {...this.rest} />;
  }
}

const FadeBox = withFade(Box);

class App extends Component {
  state = {
    shouldShowBox: true
  };

  toggleBox = () => {
    this.setState(prevState => ({
      shouldShowBox: !prevState.shouldShowBox
    }));
  };

  render() {
    return (
      <div className="app">
        <ReactTransitionGroup>
          {this.state.shouldShowBox && <FadeBox />}
        </ReactTransitionGroup>

        <button className="toggle-btn" onClick={this.toggleBox}>
          toggle
        </button>
      </div>
    );
  }
}

export default App;
