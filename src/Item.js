import React, { useState } from 'react';
import './Item.css';

function Item({ id, title, onRemove, category }) {
  const [backgroundColor, setBackgroundColor] = useState('initialColor');
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableCategory] = useState(category);

  const handleRemove = () => {
    onRemove(id);
  };

  const markAsDone = () => {
    setBackgroundColor('#33cc33');
  };

  const handleTitleChange = (event) => {
    setEditableTitle(event.target.value);
  };

  return (
    <div style={{ backgroundColor: backgroundColor }} className="item-container">
      <input
        className='name-input'
        type="text"
        placeholder="title"
        value={editableTitle}
        onChange={handleTitleChange}
      />
      <span>Category: {editableCategory}</span> {/* Display category */}
      <button onClick={markAsDone} type="button" className="btn btn-success">Done</button>
      <button onClick={handleRemove} type="button" className="btn btn-danger">Delete</button>
    </div>
  );
}

export default Item;
