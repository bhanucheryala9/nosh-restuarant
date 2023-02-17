import React, { useState } from "react";

function InventoryPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Chicken Breast", quantity: 10 },
    { id: 2, name: "Beef Patties", quantity: 20 },
    { id: 3, name: "Lettuce", quantity: 5 },
    { id: 4, name: "Tomatoes", quantity: 10 },
    { id: 5, name: "Cheese", quantity: 15 },
    { id: 6, name: "Bread", quantity: 25 },
    { id: 7, name: "Oil", quantity: 2 },
  ]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddItem = (event) => {
    event.preventDefault();
    const newItem = { id: items.length + 1, name, quantity };
    setItems([...items, newItem]);
    setName("");
    setQuantity("");
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
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
          Item:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
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

export default InventoryPage;
