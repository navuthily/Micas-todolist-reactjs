import React, { Component } from "react";
import "./App.css";

import Todolist from "./components/Todolist";
import {
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      todoItems: [],
      isComplete: false,
      selectAction: false,
      selectAll: true,
      selectFinish: false,
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.displayAll = this.displayAll.bind(this);
    this.displayAction = this.displayAction.bind(this);
    this.displayCompleted = this.displayCompleted.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.onFinishedAll = this.onFinishedAll.bind(this);
  }
  displayAction() {
    this.setState({
      selectAction: true,
      selectAll: false,
      selectFinish: false,
    });
  }
  displayCompleted() {
    this.setState({
      selectAction: false,
      selectAll: false,
      selectFinish: true,
    });
  }

  displayAll() {
    this.setState({
      selectAction: false,
      selectAll: true,
      selectFinish: false,
    });
  }
  clearCompleted() {
    const { todoItems } = this.state;
    var newTodos = todoItems.filter(function (el) {
      return el.isComplete === false;
    });

    this.setState({
      todoItems: [...newTodos],
    });
  }
  onFinishedAll() {
    // ko co cai nao duoc selected -> click -> all selected
    // co < total duoc select -> click -> all selected
    // all selected -> click -> none selected
    let totalSelected = 0;
    for (const item of this.state.todoItems) {
      if (item.isComplete) {
        totalSelected++;
      }
    }

    const newSelectedState = totalSelected < this.state.todoItems.length;
    const todoItems = this.state.todoItems.map((item) => {
      item.isComplete = newSelectedState;
      return item;
    });

    this.setState({
      todoItems,
    });

    console.log("todo items", todoItems);

  }
  showMenuBar = () => {
    const {
      todoItems,
      selectAction,
      selectAll,
      selectFinish,
      clearCompleted,
    } = this.state;
    if (todoItems.length > 0) {
      return todoItems.map((item, index) => {
        console.log("hhh", item.id);
        return (
          <Todolist
            key={item.id}
            item={item}
            onClick={this.onItemClicked(item)}
            onRemove={(e) => this.onRemoveItem(item)}
            changeEvent={this.changeTodoName.bind(this, item.id)}
            selectAction={selectAction}
            selectAll={selectAll}
            selectFinish={selectFinish}
            clearCompleted={clearCompleted}
          />
        );
      });
    }

    // if (todoItems.length === 0) {
    //   return <div className="nothing-here"></div>;
    // }
  };
  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }
  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = this.newItem.value;
      console.log(text);
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        todoItems: [{ name: text, isComplete: false }, ...this.state.todoItems],
      });
    }
  }
  onAdd(event) {
    event.preventDefault();
    var text = this.newItem.value;
    if (!text) {
      return;
    }
    text = text.trim();
    if (!text) {
      return;
    }
    if (this.state.name !== "") {
      this.setState({
        todoItems: [
          {
            name: text,
            isComplete: false,
            id: Date.now(),
          },
          ...this.state.todoItems,
        ],
      });
    }
  }
  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }
  onRemoveItem(item) {
    const newItem = this.state.todoItems.filter((todoItems) => {
      return todoItems !== item;
    });
    this.setState({
      todoItems: [...newItem],
    });
    if (newItem.length === 0) {
      this.setState({
        message: "No item on your list, add some",
      });
    }
  }
  changeTodoName = (id, event) => {
    if (event.target.value.length === 0) {
      return;
    }
    const index = this.state.todoItems.findIndex((item) => {
      return item.id === id;
    });
    const item = Object.assign({}, this.state.todoItems[index]);
    item.name = event.target.value;
    const todoItems = Object.assign([], this.state.todoItems);
    todoItems[index] = item;
    this.setState({ todoItems: todoItems });
  };
  render() {
    const { newItem, todoItems } = this.state;
    var newTodos = todoItems.filter(function (el) {
      return el.isComplete === false;
    });
    console.log(newTodos+"nêw");
    var totalItemAction = newTodos.length;
    var newTodos2 = todoItems.filter(function (el) {
      return el.isComplete === true;
    });
  return (
<>
      <h1 className='todoapp'>todos</h1>
      <div className="App" onClick={this.onItemClicked}>
   
        <div className="Header">       
            <FontAwesomeIcon onClick={this.onFinishedAll} className="finished-all"  icon={faCheckCircle} />
          <input
            type="text"
            className="input-for-add"
            placeholder="What needs to be done?"
            onKeyUp={this.onKeyUp}
            onChange={this.onChange}
            value={newItem}
            ref={(input) => (this.newItem = input)}
          />
            <FontAwesomeIcon    
            onClick={this.onAdd}
            className="add"
            onChange={this.onChange}
             icon={faPlus}/>
        </div>
        {this.showMenuBar()}
        <div className="footer">
          <p className='totalItemAction'>{totalItemAction} items left</p>
          <button onClick={this.displayAll}>All</button>
          <button onClick={this.displayAction}>Action</button>
          <button onClick={this.displayCompleted}>Completed</button>

          {newTodos2.length > 0 ? (
            <div>
              <button onClick={this.clearCompleted}>Clear Completed</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      </>
    );
  }
}

export default App;
