import React, { useState } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useNotification } from "../../../contexts/Notification";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../contexts/AppStoreContext";
import Dropzone from "react-dropzone";

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

  const AddInventory = (props: AddInventoryProps) => {
  const [formData, setFormData] = useState<InventoryRequestPayload>();
  const [defaultValues, setDefaultValues] = useState({});
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [productURI, setProductURI] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setShowNotification } = useNotification();
  const { AppStoreData } = useAppStore();

  useEffect(() => {
    setDefaultValues(AppStoreData?.inventoryData?.inventoryUpdateData);
    setForUpdate(AppStoreData?.inventoryData?.forUpdate);
  }, []);

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
