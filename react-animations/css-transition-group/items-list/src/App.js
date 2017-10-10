import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./App.css";
import Input from "./Input";

const Todo = props => <li onClick={props.removeTodo}>{props.todo}</li>;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["hi", "there"]
    };
  }

  addTodo = todo => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo]
    }));
  };

  removeTodo = todoIndex => {
    this.setState(prevState => ({
      todos: prevState.todos.filter((todo, i) => i !== todoIndex)
    }));
  };

  render() {
    return (
      <div>
        <Input addTodo={this.addTodo} />

        <ReactCSSTransitionGroup
          component="ul"
          transitionName="todos"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.state.todos.map((todo, i) => (
            <Todo key={i} todo={todo} removeTodo={() => this.removeTodo(i)} />
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
