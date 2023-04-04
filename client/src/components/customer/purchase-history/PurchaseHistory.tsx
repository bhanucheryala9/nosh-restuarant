import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import purchase from "../../../assets/purchase-history.jpg";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { RewardsTestData } from "../../../test-data/admin/rewards";
import { purchase_history } from "../../../test-data/customer/purchase-history";
import axios from "axios";
import _ from "lodash";

export interface DataType {
  key: React.Key;
  orderID: string;
  name: string;
  numberOfItems: number;
  price: string;
}
const PurchaseHistory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [rewardsData, setRewardsData] = useState<DataType[]>([]);
  const [showCreateRewardModal, setShowCreateRewardModal] =
    useState<boolean>(false);
  const columns: ColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number Of Items",
      dataIndex: "numberOfItems",
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
          <Button colorScheme={"orange"} rounded="full">
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
        price: Number(item.totalAmount)/100
      };
    });
    return toReturn;
  };
  useEffect(() => {
    // const formattedData = purchase_history.reduce(
    //   (accumulator: any, currentValue) => {
    //     return [
    //       ...accumulator,
    //       {
    //         key: currentValue.orderID,
    //         ...currentValue,
    //       },
    //     ];
    //   },
    //   []
    // );
    axios
      .get("http://localhost:5000/api/customer/v1/get-purchase-history", {
        params: {
          id: "cheryalabhanu99@gmail.com",
        },
      })
      .then((response) => {
        console.log("********** response of order", response.data.orders);
        setRewardsData(prepareData(response.data.orders));

      })
      .catch((error) => {
        console.log("************** error", error);
      });
  }, []);

  //

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
          width={"100%"}
          height="72"
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
          <Text
            fontSize={"2xl"}
            fontWeight="semibold"
            fontFamily={"'Nunito', sans-serif"}
          >
            Purchase History
          </Text>
        </Flex>
      </Flex>
      <Flex bg="white" p="6" mt="4" shadow={"sm"} rounded="sm" my="6" mx="4">
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
          rowSelection={rowSelection as any}
          columns={columns}
          dataSource={rewardsData}
        />
      </Flex>
    </Flex>
  );
};

export default PurchaseHistory;
