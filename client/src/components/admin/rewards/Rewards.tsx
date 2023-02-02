import {
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import Header from "../../header/Header";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const Rewards = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getStatusComponent = () => {
    return (
      <Flex bg="white" shadow="sm" px="8" py="5" rounded="md" alignItems={"center"}>
        <Flex>
          <IconButton
            bg={"orange.200"}
            color="orange.600"
            aria-label="Send email"
            icon={<AiFillCodeSandboxSquare />}
          />
        </Flex>
        <Flex direction={"column"} mx="6">
          <Text fontSize={"xl"} fontWeight="bold">Total</Text>
          <Text fontSize={"md"} color="gray.700" fontWeight={"semibold"}>56</Text>
        </Flex>
      </Flex>
    );
  };
  return (
    <React.Fragment>
      <Header />
      <Flex mx="10" my="6" direction={"column"}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xl"} fontWeight="bold">
            Offers and Rewards
          </Text>
          <Button colorScheme={"orange"}> Create Coupons</Button>
        </Flex>

        <Grid
          my="4"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
        >
          {[1, 2, 3, 4].map((item) => {
            return <GridItem colSpan={1} rowSpan={1}>
                {getStatusComponent()}
            </GridItem>;
          })}
        </Grid>

        <Flex>
          <Table
            style={{ width: "100%" }}
            size="large"
            rowSelection={rowSelection as any}
            columns={columns}
            dataSource={data}
          />
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default Rewards;
