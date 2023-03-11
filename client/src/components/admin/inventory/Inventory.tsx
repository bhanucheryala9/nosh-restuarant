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

  const Inventory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryColumns[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState();

  const { setShowNotification } = useNotification();
  const navigate = useNavigate();
  const { AppStoreData, setAppStoreData } = useAppStore();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof InventoryColumns;

   const prepareData = (data: InventoryColumns[]) => {
    const formattedData = data.reduce((accumulator: any, currentValue) => {
      return [
        ...accumulator,
        {
          id: currentValue.id,
          productName: currentValue.productName,
          description: currentValue.description,
          price: currentValue.price,
          discount: currentValue.discount,
          isAvailable: currentValue.isAvailable,
          tax: currentValue.tax,
          category: currentValue.category,
        },
      ];
    }, []);
    return formattedData;
  };

  const Inventory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryColumns[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState();

  const { setShowNotification } = useNotification();
  const navigate = useNavigate();
  const { AppStoreData, setAppStoreData } = useAppStore();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof InventoryColumns;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<InventoryColumns> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            colorScheme="orange"
            size="sm"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
          >
            Search
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
            size="sm"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <AiOutlineSearch style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

    const onDeleteClicked = (data: any) => {
    console.log(" data for deleteinh", data);
    axios
      .delete("http://34.235.166.147:5000/api/admin/v1/delete-item", {
        params: {
          id: data.id,
        },
      })
      .then((response: any) => {
        setInventoryData(prepareData(response.data.items));
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Successfully deleted item!",
          showAlert: true,
        });
      })
      .catch(() => {
        setShowNotification({
          status: NotificationStatus.ERROR,
          alertMessage: "Failed to retreive items information..!",
          showAlert: true,
        });
      });
  };


  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleEditItem(item.id)}>Edit</button>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
          {editingItemId !== null && (
            <tr>
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
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleAddItem}>
        <h3>Add Item</h3>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Inventory;
