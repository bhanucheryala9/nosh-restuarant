import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import purchase from "../../../assets/purchase-history.jpg";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export interface DataType {
  key: React.Key;
  orderID: string;
  name: string;
  numberOfItems: number;
  price: string;
}
const PurchaseHistory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [completeOrderDetails, setCompletedOrderDetails] = useState([]);
  const [rewardsData, setRewardsData] = useState<DataType[]>([]);
  const navigate = useNavigate();

  const onReorderClicked = (id: any) => {
    const precartData = completeOrderDetails?.filter(
      (item: any) => item.orderId === id
    );
    localStorage.setItem(
      "orders",
      JSON.stringify((precartData[0] as any)?.orderDetails)
    );
    navigate("/payment")
  };
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      render: (text: string) => <a>{(text as string).toUpperCase()}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <div>{_.capitalize(text)}</div>,
    },
    {
      title: "Number Of Items",
      dataIndex: "numberOfItems",
      render: (text: string) => (
        <div>
          <b>{_.capitalize(text)}</b>
        </div>
      ),
    },
    {
      title: "Price $",
      dataIndex: "price",
    },
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          <Button
            colorScheme={"orange"}
            rounded="full"
            onClick={() => onReorderClicked((record as any)?.orderID)}
          >
            Reorder
          </Button>
        </HStack>
      ),
    },
  ];

  const prepareData = (data: any) => {
    const toReturn = data?.map((item: any) => {
      return {
        key: _.upperCase(item.orderId),
        orderID: item.orderId,
        name: item.firstName + " " + item.lastName,
        numberOfItems: item.orderDetails.length,
        price: Number(item.totalAmount) / 100,
      };
    });
    return toReturn;
  };
  useEffect(() => {
    const userID = JSON.parse(
      localStorage?.getItem("userInfo") || ("{}" as string)
    );
    axios
      .get("http://localhost:5000/api/customer/v1/get-purchase-history", {
        params: {
          id: userID?.email,
        },
      })
      .then((response) => {
        setCompletedOrderDetails(response.data.orders);
        setRewardsData(prepareData(response.data.orders));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  return (
    <Flex direction={"column"} justifyContent="center">
      <Flex justifyContent={"center"} direction="column" alignItems={"center"}>
        <Image
          src={purchase}
          
          filter={"auto"}
          brightness="75%"
        />
        <Flex
          bg={"white"}
          rounded="lg"
          py="4"
          px="28"
          mt="-10"
          zIndex={10}
          shadow="base"
        >
          <Text>
            Purchase History
          </Text>
        </Flex>
      </Flex>
      <Flex bg="white" p="6" mt="4" shadow={"sm"} rounded="sm" my="6" mx="4">
        <Table
          style={{ width: "100%" }}
          size="large"
          rowSelection={rowSelection as any}
          columns={columns}
          dataSource={rewardsData}
        />
      </Flex>
    </Flex>
  );
};

export default PurchaseHistory;