import React, { Component } from 'react';
import { faCheckCircle , faTimesCircle, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Todolist extends Component {
  render() {
    const {onClick,onRemove, onEdit, item, changeEvent,selectAction, selectAll, selectFinish} = this.props;
    var className ='TodoItem ';
    if(item.isComplete===true){
      className +='TodoItem-complete';
    }
    if((item.isComplete===true)&&(selectAction===true)){
      className +='TodoItem-complete no-display';
    }
    if((item.isComplete===false)&&(selectFinish===true)){
      className +='no-display';
      console.log(className+'nef nef')
    }
    return (
     <div>
      <div className={className } >
        <FontAwesomeIcon onClick={onClick} className='facheckcircle' icon={faCheckCircle} />
        <input onChange={changeEvent} defaultValue={item.name} className='item'/>
        <button className='remove'  onClick ={onRemove}><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon> </button>
      </div>
      <div>
      </div>
    </div>
    );
  }
} 

export default Todolist;
