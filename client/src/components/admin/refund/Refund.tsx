import React, { useEffect, useRef, useState } from "react";
import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Link,
  Tag,
  TagLabel,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { Input, InputRef, Space, Table } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { admin_orders } from "../../../test-data/admin/aorder";
import { getStatusColors } from "../../common/utils";
import _ from "lodash";
import axios from "axios";
import {
  AiOutlineCheckCircle,
  AiOutlineMore,
  AiOutlineSearch,
} from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { FilterConfirmProps } from "antd/es/table/interface";
export interface DataType {
  key: React.Key;
  orderID: string;
  customer_name: string;
  order_status: string;
  amount: string;
}

interface EOrdersColumns {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
  };
  orderDetails: Array<{
    id: string;
    productName: string;
    category: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  orderStatus: string;
  isPaid: boolean;
  paymentId: string;
  createdAt: Date | string;
}

interface EorderTableColumns {
  orderId: string;
  name: string;
  email: string;
  orderDetails: Array<{
    id: string;
    productName: string;
    category: string;
    price: number;
    quantity: number;
  }>;
  isPaid: boolean;
  noOfItems: number;
  totalAmount: number;
  orderStatus: string;
  createdAt: Date | string;
}
const Refund = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [rewardsData, setRewardsData] = useState<DataType[]>([]);

  const [eordersData, setEOrdersData] = useState<EOrdersColumns[]>([]);
  const [tableData, setTableData] = useState<EorderTableColumns[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    ready: 0,
    processing: 0,
    preparing: 0,
  });
  const [showCreateRewardModal, setShowCreateRewardModal] = useState<boolean>(
    false
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof EorderTableColumns;

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
  ): ColumnType<EorderTableColumns> => ({
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
  const prepareData = (data: EOrdersColumns[]) => {
    const stats = data.reduce(
      (accumulator: any, currentValue) => {
        if (currentValue.orderStatus === "processing") {
          return { ...accumulator, processing: 1 + accumulator.processing };
        } else if (currentValue.orderStatus === "ready") {
          return { ...accumulator, ready: 1 + accumulator.ready };
        } else if (currentValue.orderStatus === "preparing") {
          return { ...accumulator, preparing: 1 + accumulator.preparing };
        } else {
          return accumulator;
        }
      },
      {
        total: data.length || 0,
        ready: 0,
        processing: 0,
        preparing: 0,
      }
    );
    setOrderStats(stats);
    const formattedData = data.reduce((accumulator: any, currentValue) => {
      return [
        ...accumulator,
        {
          id: currentValue.orderId,
          orderId: currentValue.orderId,
          name: currentValue.lastName + " " + currentValue.firstName,
          email: currentValue.email,
          isPaid: currentValue.isPaid,
          orderDetails: currentValue.orderDetails,
          noOfItems: currentValue.orderDetails?.length || 0,
          totalAmount: currentValue.totalAmount,
          orderStatus: currentValue.orderStatus,
          createdAt: currentValue.createdAt,
        },
      ];
    }, []);
    return formattedData;
  };

  const onOrderStatusChange = (orderID: string, status: string) => {
    let itemData = eordersData?.filter((item) => item.orderId === orderID);
    const itemNeedtoUpdate = { ...itemData[0], isPaid: false };
    console.log("************* data for rufundL", itemNeedtoUpdate);
    setIsLoading(true);
    axios
      .put(
        "http://localhost:5000/api/admin/v1/update-order-status",
        itemNeedtoUpdate
      )
      .then((response) => {
        setEOrdersData(response.data.items);
        setTableData(prepareData(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  const columns: ColumnsType<EorderTableColumns> = [
    {
      title: "Id",
      dataIndex: "orderId",
      ...getColumnSearchProps("orderId"),

      render: (text) => (
        <>
          <Text>#{(text as string).toUpperCase()}</Text>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <div>{_.capitalize(text)}</div>,
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (text) => <>${text / 100}</>,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      dataIndex: "isPaid",
      filters: [
        {
          text: "PAID",
          value: true,
        },
        {
          text: "REFUND INITIATED",
          value: false,
        },
      ],
      onFilter: (value: any, record) => record.isPaid === value,
      render: (text) => (
        <>
          <HStack>
            {text ? (
              <AiOutlineCheckCircle color="green" fontSize="20px" />
            ) : (
              <HiOutlineReceiptRefund color="#975A16" fontSize="20px" />
            )}
            <Text
              textColor={text ? "green.500" : "yellow.700"}
              fontWeight="semibold"
            >
              {text ? "PAID" : "REFUND INITIATED"}
            </Text>
          </HStack>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<AiOutlineMore />}
                  size="sm"
                ></MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      onOrderStatusChange(record.orderId, "accepted")
                    }
                  >
                    Refund
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
      ),
    },
  ];

  useEffect(() => {
    const formattedData = admin_orders.reduce(
      (accumulator: any, currentValue) => {
        return [
          ...accumulator,
          {
            key: currentValue.orderID,
            ...currentValue,
          },
        ];
      },
      []
    );

    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/admin/v1/get-orders")
      .then((response) => {
        setEOrdersData(response.data.items);
        setTableData(prepareData(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setRewardsData(formattedData);
  }, []);
  return (
    <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
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
          size="large"
          pagination={{ pageSize: 6 }}
          columns={columns}
          dataSource={tableData}
        />
      </Flex>
    </Flex>
  );
};

export default Refund;
