import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleChange = e => {
    const text = e.target.value;

    this.setState(() => ({
      input: text
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.input);

    this.setState(() => ({
      input: ""
    }));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Input;
