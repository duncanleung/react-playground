////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import withCat from "./withCat";
import * as styles from "./styles";

const withMouse = Component => {
  return class Mouse extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        x: 0,
        y: 0
      };

      this.handleMove = this.handleMove.bind(this);
    }

    handleMove(e) {
      console.log("ehllo");
      this.setState({
        x: e.clientX,
        y: e.clientY
      });
    }

    render() {
      return (
        <div onMouseMove={this.handleMove}>
          <Component {...this.props} mouse={this.state} />
        </div>
      );
    }
  };
};

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    const { mouse } = this.props;

    return (
      <div style={styles.container}>
        {mouse ? (
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    );
  }
}
const AppWithMouse = withMouse(withCat(App));
ReactDOM.render(<AppWithMouse />, document.getElementById("root"));
