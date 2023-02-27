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

export interface DataType {
  key: React.Key;
  orderID: string;
  customer_name: string;
  order_status: string;
  amount: string;
}
const SalesDashboard = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [rewardsData, setRewardsData] = useState<DataType[]>([]);
  const [showCreateRewardModal, setShowCreateRewardModal] =
    useState<boolean>(false);
  const columns: ColumnsType<DataType> = [
    {
      title: "Reward ID",
      dataIndex: "orderID",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Reward Code",
      dataIndex: "customer_name",
    },
    {
      title: "Category",
      dataIndex: "order_status",
    },
    {
      title: "Discount %",
      dataIndex: "amount",
    },
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          <IconButton
            aria-label="Search database"
            icon={<DeleteIcon />}
            size="sm"
          />
          <IconButton
            aria-label="Search database"
            icon={<EditIcon />}
            size="sm"
          />
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

  const orderStats = [
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
    return orderStats.map((item, index) => {
      return (
        <GridItem colSpan={1} rowSpan={1}>
          <Flex
            bg="white"
            shadow="md"
            px="8"
            py="5"
            rounded="md"
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
                <StatLabel fontSize={"md"}>{item.name}</StatLabel>
                <StatNumber textColor={`${colors[index]}.600`} fontSize={"3xl"}>
                  {item.quantity}
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
      <Flex mx={{base:"4",lg:"10"}} my="6" direction={"column"}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={{base:"lg",lg:"xl"}} fontWeight="bold">
            Dashbord
          </Text>
          <Button colorScheme={"orange"} size={{base:"sm", lg:"lg"}}> Create Coupons</Button>
        </Flex>

        <Grid
          my="4"
          templateRows={{base:"repeat(4, 1fr)",lg:"repeat(1, 1fr)"}}
          templateColumns={{base:"repeat(1, 1fr)",lg:"repeat(4, 1fr)"}}
          gap={{base:2,lg:4}}
        >
          {getStatusComponent()}
        </Grid>
      </Flex>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        mx="8"
      >
        <GridItem colSpan={4} p="4" bg="white" rounded={"md"} shadow="base">
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
        </GridItem>
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
              scroll={{x:400}}
              columns={columns}
              dataSource={rewardsData}
            />
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default SalesDashboard;
