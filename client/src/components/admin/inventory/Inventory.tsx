import React, { useState } from 'react';

function Inventory() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 5 },
    { id: 2, name: 'Item 2', price: 20, quantity: 3 },
    { id: 3, name: 'Item 3', price: 15, quantity: 7 },
  ]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const handleAddItem = (event) => {
    event.preventDefault();
    const newItem = { id: items.length + 1, name, price, quantity };
    setItems([...items, newItem]);
    setName('');
    setPrice('');
    setQuantity('');
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setName(itemToEdit.name);
    setPrice(itemToEdit.price);
    setQuantity(itemToEdit.quantity);
    setEditingItemId(id);
  };

  const handleSaveItem = (event) => {
    event.preventDefault();
    const updatedItems = items.map((item) => {
      if (item.id === editingItemId) {
        return { ...item, name, price, quantity };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
    setName('');
    setPrice('');
    setQuantity('');
    setEditingItemId(null);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <h2>Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {editingItemId === item.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveItem}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleEditItem(item.id)}>Edit</button>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!editingItemId && (
        <form onSubmit={handleAddItem}>
          <h3>Add Item</h3>
          <label>
            Name:
            <
