import React, { useState } from "react";

function Inventory() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 5 },
    { id: 2, name: "Item 2", price: 20, quantity: 3 },
    { id: 3, name: "Item 3", price: 15, quantity: 7 },
  ]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddItem = (event) => {
    event.preventDefault();
    const newItem = { id: items.length + 1, name, price, quantity };
    setItems([...items, newItem]);
    setName("");
    setPrice("");
    setQuantity("");
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
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddItem}>
        <h3>Add Item</h3>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Inventory;
