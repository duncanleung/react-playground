import React, { Component } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import { TweenMax } from "gsap";

import "./App.css";

class Box extends Component {
  componentWillEnter(callback) {
    const ele = this.element;

    TweenMax.fromTo(
      ele,
      0.3,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, onComplete: callback }
    );
  }

  componentWillLeave(callback) {
    const ele = this.element;
    TweenMax.fromTo(
      ele,
      0.3,
      { x: 0, opacity: 1 },
      { x: 100, opacity: 0, onComplete: callback }
    );
  }

  render() {
    return <div className="box" ref={node => (this.element = node)} />;
  }
}

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
          {this.state.shouldShowBox && <Box />}
        </ReactTransitionGroup>

        <button className="toggle-btn" onClick={this.toggleBox}>
          toggle
        </button>
      </div>
    );
  }
}

export default App;
