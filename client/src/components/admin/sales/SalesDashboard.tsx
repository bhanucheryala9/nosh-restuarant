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
    
return(
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
        <GridItem colSpan={4}>
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