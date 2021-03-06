import React, {
  Component
} from "react";
import "../App.css";
import 'antd/dist/antd.css'
import {
  Button
} from 'antd';
import {
  CheckOutlined,
  PlusOutlined
} from '@ant-design/icons';

import {
  apiGetTodo,
  apiDeleteCompleted,
  apiChangeStateOneItem,
  apiFinishAll,
  apiAdd,
  apiDeleteOneItem,
  apiEditContent
} from '../services/services-todo'

import TodoItem from "./TodoItem";

class TodoList extends Component {
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

  async clearCompleted() {
    const {
      todoItems
    } = this.state;
    var newTodos = todoItems.filter(function (el) {
      return el.isComplete === false;
    })

    apiDeleteCompleted({
      data: {
        todoItems: [...newTodos]
      }
    })
    this.setState({
      todoItems: [...newTodos],
    });
  }
  onFinishedAll() {
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
    apiFinishAll()
      .then(() => {
        this.setState({
          todoItems,
        });
      })
      .catch(err => {
        console.log(err)
      });
  }
  showMenuBar() {
    const {
      todoItems,
      selectAction,
      selectAll,
      selectFinish,
      clearCompleted,
    } = this.state;
    if (todoItems) {
      return todoItems.map((item) => {
        return ( <
          TodoItem key = {
            item._id
          }
          item = {
            item
          }
          onClick = {
            this.onItemClicked(item)
          }
          onRemove = {
            () => this.onRemoveItem(item)
          }
          changeEvent = {
            this.changeTodoContent.bind(this, item._id)
          }
          selectAction = {
            selectAction
          }
          selectAll = {
            selectAll
          }
          selectFinish = {
            selectFinish
          }
          clearCompleted = {
            clearCompleted
          }
          />
        );
      });
    }
  }
  onItemClicked(item) {
    return () => {
      const isComplete = item.isComplete;
      const {
        todoItems
      } = this.state;
      const index = todoItems.indexOf(item);
      apiChangeStateOneItem(item)
        .then(() => {
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
        })
        .catch(err => {
          console.log(err.res)
        });
    };
  }
  async onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = this.newItem.value;
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      apiAdd({
          content: text,
          isComplete: false
        })
        .then(() => {
          this.setState({
            todoItems: [{
              content: text,
              isComplete: false
            }, ...this.state.todoItems],
          });
        })
        .catch((error) => {
          console.log("error : " + error);
        });
    }
  }
  async onAdd(event) {
    event.preventDefault();
    var text = this.newItem.value;
    if (!text) {
      return;
    }
    text = text.trim();
    if (!text) {
      return;
    }
    if (this.state.content !== "") {
      apiAdd({
          content: text,
          isComplete: false
        })
        .then(() => {
          this.setState({
            todoItems: [{
              content: text,
              isComplete: false
            }, ...this.state.todoItems]
          });
        })
        .catch((error) => {
          console.log("error : " + error);
        });
    }
  }
  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }
  async onRemoveItem(item) {
    const newItem = this.state.todoItems.filter((todoItems) => {
      return todoItems !== item;
    });
    apiDeleteOneItem(item)
      .then(() => {
        this.setState({
          todoItems: [...newItem],
        });
      })
      .catch(err => {
        console.log(err.res)
      });

  }
  changeTodoContent (_id, event) {
    if (event.target.value.length === 0) {
      return;
    }
    const index = this.state.todoItems.findIndex((item) => {
      return item._id === _id;
    });
    const item = Object.assign({}, this.state.todoItems[index]);
    item.content = event.target.value;
    const todoItems = Object.assign([], this.state.todoItems);
    todoItems[index] = item;
    this.setState({
      todoItems: todoItems
    });
    // var url = `todos/${_id}`;
    // callApi(url, "patch", {
    //   content: event.target.value
    // });
    apiEditContent(_id, {
      content: event.target.value
    })
  }
  componentDidMount() {
    apiGetTodo().then((res) => {
      if (!res.data) {
        this.setState({
          todoItems: []
        });
      }
      this.setState({
        todoItems: res.data,
      });
    }).catch((err) => {
      console.log(err)
    });
  }
  render() {

    const { newItem, todoItems } = this.state;
      var todoAction = todoItems.filter(function (el) {
        return !el.isComplete;
      });
      var totalItemAction = todoAction.length;
      var todoCompleted = todoItems.filter(function (el) {
        return el.isComplete;
      });
  return (
<>
      <h1 className='todoapp'>todos</h1>
      <div className="App" onClick={this.onItemClicked}   >
        <div className="Header">       
            <CheckOutlined onClick={()=>this.onFinishedAll()}   />
          <input
            type="text"
            className="input-for-add"
            placeholder="What needs to be done?"
            onKeyUp={(e)=>this.onKeyUp(e)}
            onChange={(e)=>this.onChange(e)}
            value={newItem}
            ref={(input) => (this.newItem = input)}
          />
            <PlusOutlined 
            onClick={(e)=>this.onAdd(e)}
            onChange={(e)=>this.onChange(e)}
            className="add"
             />
        </div>
        {this.showMenuBar()}
        {/* điều kiên để hiển thị footer */}
        {todoItems.length > 0 ? (
          <div className="footer">
            <p className='totalItemAction'>{totalItemAction} items left</p>
            <Button onClick={()=>this.displayAll()}>All</Button>
            <Button onClick={()=>this.displayAction()}>Action</Button>
            <Button onClick={()=>this.displayCompleted()}>Completed</Button>
            {/* điều kiện để hiển thị Button 'Clear Completed' */}
            {todoCompleted.length > 0 ? (
              <div>
                <Button onClick={()=>this.clearCompleted()}>Clear Completed</Button>
              </div>
               ) : (
              <div></div>
             )}
          </div>
          ) : (
         <div></div>
        )}
      </div>
      </>
    );
  }


}

export default TodoList;