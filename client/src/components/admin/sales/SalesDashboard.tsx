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
} from "@chakra-ui/react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
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
  noOfItems: number;
  totalAmount: number;
  orderStatus: string;
  createdAt: Date | string;
}
const SalesDashboard = () => {
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
  const [showCreateRewardModal, setShowCreateRewardModal] =
    useState<boolean>(false);

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
  const columns: ColumnsType<EorderTableColumns> = [
    {
      title: "Id",
      dataIndex: "orderId",
      render: (text) => (
        <>
          <Link>{(text as string).toUpperCase()}</Link>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <div>{_.capitalize(text)}</div>,
    },
    {
      title: "No of Items",
      dataIndex: "noOfItems",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (text) => <>${text / 100}</>,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (text) => (
        <>
          {
            <Tag
              size={"md"}
              key={"text"}
              borderRadius="full"
              variant="solid"
              colorScheme={getStatusColors(text)}
              p="1"
            >
              <TagLabel mx="4">{_.upperCase(text)}</TagLabel>
            </Tag>
          }
        </>
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
      .get("http://34.235.166.147:5000/api/admin/v1/get-orders")
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const data = [
    {
      name: "Jan 2021",
      "Product A": 3432,
      "Procuct B": 2342,
    },
    {
      name: "Feb 2021",
      "Product A": 2342,
      "Procuct B": 7746,
    },
    {
      name: "Mar 2021",
      "Product A": 4565,
      "Procuct B": 2556,
    },
    {
      name: "Apr 2021",
      "Product A": 6654,
      "Procuct B": 4465,
    },
    {
      name: "May 2021",
      "Product A": 8765,
      "Procuct B": 5553,
    },
    {
      name: "May 2021",
      "Product A": 3432,
      "Procuct B": 2342,
    },
    {
      name: "Jun 2021",
      "Product A": 2342,
      "Procuct B": 7746,
    },
    {
      name: "Jul 2021",
      "Product A": 4565,
      "Procuct B": 2556,
    },
  ];

  const colors = ["red", "green", "yellow", "blue"];

  const orderStats1 = [
    {
      name: "Total",
      quantity: "20",
    },
    {
      name: "Processing",
      quantity: "10",
    },
    {
      name: "Preparing",
      quantity: "5",
    },
    {
      name: "Ready for Pickup",
      quantity: "5",
    },
  ];

  const getStatusComponent = () => {
    return Object.entries(orderStats || {}).map((item, index) => {
      return (
        <GridItem colSpan={1} rowSpan={1}>
          <Flex
            bg="white"
            shadow="base"
            px="8"
            py="5"
            rounded="lg"
            alignItems={"center"}
          >
            <HStack mx={10} gap={6}>
              <Icon
                color={`${colors[index]}.500`}
                aria-label="Send email"
                as={ChatIcon}
                boxSize="12"
              />
              <Stat>
                <StatLabel fontSize={"md"}>{_.capitalize(item[0])}</StatLabel>
                <StatNumber textColor={`${colors[index]}.600`} fontSize={"3xl"}>
                  {item[1]}
                </StatNumber>
              </Stat>
            </HStack>
          </Flex>
        </GridItem>
      );
    });
  };
  return (
    <>
      <Flex mx={{ base: "4", lg: "10" }} mt="6" direction={"column"}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
            Dashbord
          </Text>
        </Flex>

        <Grid
          my="4"
          templateRows={{ base: "repeat(4, 1fr)", lg: "repeat(1, 1fr)" }}
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 2, lg: 4 }}
        >
          {getStatusComponent()}
        </Grid>
      </Flex>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        mx="8"
      >
        {/* <GridItem colSpan={4} p="4" bg="white" rounded={"md"} shadow="base">
          <VStack gap={4}>
            <Text fontSize={"xl"} fontWeight="semibold">
              Sales Charts
            </Text>
            <ResponsiveContainer height={179}>
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="3%" stopColor="#ED8936" stopOpacity={0.8} />
                    <stop offset="97%" stopColor="#FBD38D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Procuct B"
                  stroke="#C05621"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>{" "}
          </VStack>
        </GridItem> */}
        <GridItem
          colSpan={4}
          p={4}
          bg="white"
          rounded={"md"}
          shadow="base"
          my="4"
        >
          <VStack justifyContent={"start"} alignItems="start">
            <Text fontSize={"xl"} fontWeight="semibold" mb="4" mx="2">
              {" "}
              Orders
            </Text>
            <Divider mb="2" />
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
              scroll={{ x: 400 }}
              columns={columns}
              dataSource={tableData}
            />
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default SalesDashboard;
