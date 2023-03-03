import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
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

  const columns: ColumnsType<InventoryColumns> = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount %",
      dataIndex: "discount",
    },
    {
      title: "Is Available",
      dataIndex: "isAvailable",
      render: (text) => (
        <>
          {text ? (
            <Tag color={"green"} key={text}>
              {"Yes"}
            </Tag>
          ) : (
            <Tag color={"blue"} key={text}>
              {"No"}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "45px",
    //   render: (_, record) => (
    //     <HStack>
    //       <IconButton
    //         aria-label="delete inventory"
    //         icon={<DeleteIcon />}
    //         size="sm"
    //       />
    //       <IconButton
    //         aria-label="edit inventory"
    //         icon={<EditIcon />}
    //         size="sm"
    //       />
    //     </HStack>
    //   ),
    // },
  ];

  const prepareData = (data: InventoryColumns[]) => {
    const formattedData = data.reduce((accumulator: any, currentValue) => {
      return [
        ...accumulator,
        {
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

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:5000/api/admin/get-items").then((response) => {
      setInventoryData(prepareData(response.data.inventory));
      setIsLoading(false);
    }).catch((error)=>{
        setIsLoading(false);
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
    <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
      {isLoading && <Loader />}
      <Flex justifyContent={"space-between"}>
        <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
          Offers and Rewards
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
          rowSelection={rowSelection as any}
          columns={columns}
          dataSource={inventoryData}
        />
      </Flex>
    </Flex>
  );
};

export default Inventory;
