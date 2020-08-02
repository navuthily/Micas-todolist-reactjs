import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined, CloseOutlined} from '@ant-design/icons';
class TodoItem extends Component {
  render() {
    const {
      onClick, onRemove,  item, changeEvent, selectAction,  selectFinish,
    } = this.props;
    let className = 'TodoItem ';
    if (item.isComplete)  className += 'TodoItem-complete';
    if (item.isComplete && selectAction )className += 'TodoItem-complete no-display';
    if (!item.isComplete  && selectFinish)  className += 'no-display';
    return (
      <div>
        <div className={className}>
          <CheckOutlined onClick={onClick} className="check-action"  />
          <input onChange={changeEvent} defaultValue={item.content} className="item" />
          <CloseOutlined onClick={onRemove}  className="remove"  />
        </div>
        <div />
      </div>
    );
  }
  static propTypes = {
    onClick: PropTypes.func,
    item: PropTypes.object
  }
}

export default TodoItem;
