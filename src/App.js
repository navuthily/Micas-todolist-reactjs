import React, { Component } from 'react';
import './App.css';

import Todolist from './components/Todolist'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class App extends Component {
 constructor(props) {
   super(props);
   this.state ={
   newItem:'',
    todoItems : [
     
    ]
  }
  this.onKeyUp =this.onKeyUp.bind(this);
  this.onChange=this.onChange.bind(this);
  this.onAdd= this.onAdd.bind(this);
 }
  
 showMenuBar = () => {
  const {todoItems}=this.state;
  if(todoItems.length>0){
    return todoItems.map((item, index) => {
      console.log(item.id)
      return <Todolist key={item.id} item={item}
    
      onClick={this.onItemClicked(item)}  
      onRemove={(e)=>this.onRemoveItem(item)}

      changeEvent={this.changeUserName.bind(this, item.id)}
    
      key={item.id }
      />;
    });
  }
    
  if(todoItems.length === 0) {
    return <div className='nothing-here'>
         
           </div>
  } 
};
onItemClicked(item) {
  return (event)=>{
    const isComplete= item.isComplete;
    const {todoItems}=this.state;
    const index = todoItems.indexOf(item);
    console.log(index+"<index")
    this.setState({
      todoItems:[
        ...todoItems.slice(0, index),
        {
          ...item,
          isComplete:!isComplete
        },
        ...todoItems.slice(index+1)
      ]
    })
  }
}
onKeyUp(event){

  if(event.keyCode ===13){
    let text = this.newItem.value;
    console.log(text);
  if(!text){
    return;
  }
  text= text.trim();
  if(!text){
    return;
  }
  this.setState({
    todoItems:[
      {name:text,isComplete:false},
      ...this.state.todoItems
    ]
  })
  }
  

}
onAdd(event) {
  
  event.preventDefault()
 
  var text = this.newItem.value;
  if(!text){
    return;
  }
  text= text.trim();
  if(!text){
    return;
  }
  console.log(text);
  if (this.state.name !== '')
  {
    this.setState({
      todoItems:[
        {
          name:text,
          isComplete:false,
          id:Date.now()
        },
        ...this.state.todoItems
      ]
    })

  }
}
onChange(event){
  this.setState({
    newItem:event.target.value
  })
}
onRemoveItem(item){
  const newItem =this.state.todoItems.filter(todoItems=>{
    return todoItems !==item;
  })
  this.setState({
    todoItems:[...newItem]
  })
  if(newItem.length ===0){
    this.setState({
      message:'No item on your list, add some'
    })
  }
}

changeUserName = (id, event) => {
  if (event.target.value.length === 0) {
    return;
  }
  const index = this.state.todoItems.findIndex((item)=> {
      return (item.id === id);
  })

  const item = Object.assign({}, this.state.todoItems[index]);
  item.name = event.target.value;

  const todoItems = Object.assign([], this.state.todoItems);
  todoItems[index] = item;

  this.setState({todoItems:todoItems});
}
  render() {
  const {newItem}=this.state;
    return (
      <div className='App' onClick={this.onItemClicked}>
        <div className='Header'>
          <input type='text' className='input-for-add'placeholder='Let add todolist' onKeyUp={this.onKeyUp} onChange={this.onChange} value={newItem} ref={input => this.newItem =input}/>
         <button onClick={this.onAdd}  className='add' onChange={this.onChange}type="submit"> <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon></button>
        </div>
        
           {this.showMenuBar()}
           
      </div>
    );
  }
}

export default App;