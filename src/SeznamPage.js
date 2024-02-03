import React, { useState, useEffect } from 'react';
import './SeznamPage.css';
import Item from './Item';

function SeznamPage() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  const categories = ["Work", "Personal", "Miscellaneous"];

   // Load tasks from localStorage on component mount
   useEffect(() => {
    const savedItems = localStorage.getItem('tasks');
    console.log("Loaded tasks from localStorage:", savedItems);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
    setLoading(false); // Tasks have been loaded
  }, []);

  useEffect(() => {
    console.log("Saving tasks to localStorage:", items);
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (inputText.trim() !== '') {
      const newItem = { id: Date.now(), title: inputText, category: category };
      setItems(prevItems => [...prevItems, newItem]);
      setInputText('');
      setCategory('');
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const removeItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const removeAll = () => {
    setItems([]);
  };

  const archive = () => {
    alert("Seznam byl archivován");
  };

  const done = () => {
    alert("Seznam byl označen jako hotový");
  };

  return (
    <div>
      <div className='main-div'>
        <div className='title-box'>
          <h1>Tasks</h1>
        </div>

        <div className='input-and-button'>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select category...</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <button onClick={addItem} type="button" className="btn btn-primary">Add task</button>
        </div>

        <div className='filter-category'>
          <select value={selectedCategory} onChange={handleSelectedCategory}>
            <option value="">All categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='list-items'>
          {!loading && items.filter(item => selectedCategory === '' || item.category === selectedCategory).map(item => (
            <Item key={item.id} id={item.id} title={item.title} onRemove={removeItem} category={item.category} />
          ))}
        </div>


        <div className='seznam-button-box'>
          <button onClick={done} type="button" className="btn btn-success">Done</button>
          <button onClick={archive} type="button" className="btn btn-warning">Archive</button>
          <button onClick={removeAll} type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default SeznamPage;
