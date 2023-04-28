import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { Input, InputRef, Space, Table } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNotification } from "../../../contexts/Notification";
import Loader from "../../common/Loader";
import { NotificationStatus } from "../../common/utils";
import AddInventory from "./AddInventory";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../contexts/AppStoreContext";
import { AiOutlineSearch } from "react-icons/ai";
import { FilterConfirmProps } from "antd/es/table/interface";

interface InventoryColumns {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  isAvailable: boolean;
  tax: number;
  category: string;
}
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
  const onDeleteClicked = (data: any) => {
    console.log(" data for deleteinh", data);
    axios
      .delete("http://localhost:5000/api/admin/v1/delete-item", {
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

  // const getActualData = (data:any) =>{
  //   const userData  =  unformattedEmployeeData.filter((item:any)=> item.id.toLowerCase()=== data.id.toLowerCase());
  //   return userData[0];
  // }
  const onUpdateClicked = (data: any) => {
    setToUpdateData(data);
    setForUpdate(true);
    setAppStoreData({
      ...AppStoreData,
      inventoryData: {
        inventoryUpdateData: data,
        forUpdate: true,
      },
    });
    navigate("/add-inventory");
  };

  const columns: ColumnsType<InventoryColumns> = [
    {
      title: "Product Name",
      dataIndex: "productName",
      ...getColumnSearchProps("productName"),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount %",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Is Available",
      dataIndex: "isAvailable",
      filters: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      onFilter: (value: any, record) =>
        record.isAvailable === value,
      render: (text) => (
        <>
          {text ? (
            <Tag
              size={"md"}
              key={"yes"}
              borderRadius="full"
              variant="solid"
              colorScheme="green"
              p="1"
            >
              <TagLabel mx="4">Yes</TagLabel>
            </Tag>
          ) : (
            <Tag
              size={"md"}
              key={"no"}
              borderRadius="full"
              variant="solid"
              colorScheme="red"
              p="1"
            >
              <TagLabel mx="4" >No</TagLabel>
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          <IconButton
            aria-label="Search database"
            onClick={() => {
              onDeleteClicked(record);
            }}
            icon={<DeleteIcon />}
            size="sm"
          />
          <IconButton
            aria-label="Search database"
            onClick={() => onUpdateClicked(record)}
            icon={<EditIcon />}
            size="sm"
          />
        </HStack>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/admin/v1/get-items")
      .then((response) => {
        setInventoryData(prepareData(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
      {isLoading && <Loader />}
      <Flex justifyContent={"space-between"}>
        <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
          List of Items
        </Text>
      </Flex>
      <Flex bg="white" p="6" mt="4" shadow={"sm"} rounded="sm">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // setUserProfile(record);
              },
            };
          }}
          style={{ width: "100%" }}
          scroll={{ x: 400 }}
          size="large"
          pagination={{ pageSize: 6 }}
          columns={columns}
          dataSource={inventoryData}
        />
      </Flex>
    </Flex>
  );
};

export default Inventory;
