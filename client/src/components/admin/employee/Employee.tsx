import React, { useState } from "react";
import Header from "../../header/Header";
import { Table } from "antd";
import {
  Card,
  Flex,
  Grid,
  GridItem,
  Text,
  Avatar,
  HStack,
  Link,
  Portal,
  Code,
  VStack,
  Button,
} from "@chakra-ui/react";
import { ColumnsType } from "antd/es/table";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const Employee = () => {
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
  return (
    <React.Fragment>
      <Header />
      <Flex mx="10" my="6" direction={"column"}>
        <Text fontSize={"xl"} fontWeight="bold">
          Employees List
        </Text>
        <Grid
          mt="4"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem colSpan={4}>
            <Flex bg="white" p="6" borderRadius={"md"} w="100%" direction={"column"}>
              <Flex justifyContent={"space-between"} mb="4">
                <Text>Search</Text>
                <Button colorScheme="orange">Add Employee</Button>
              </Flex>
              <Table
                style={{ width: "100%" }}
                size="large"
                rowSelection={rowSelection as any}
                columns={columns}
                dataSource={data}
              />
            </Flex>
          </GridItem>
          <GridItem colSpan={2} bg="white" borderRadius={"md"}>
            <Flex p="4">
              <Avatar
                size="xl"
                name="Christian Nwamba"
                src="https://bit.ly/code-beast"
              />
              <Flex mx="4" direction={"column"}>
                <Text
                  fontSize={"xl"}
                  fontFamily="semibold"
                  textColor={"orange.500"}
                >
                  First User
                </Text>
                <Text textColor={"gray.700"}>Manager</Text>
                <HStack mt="4">
                  <Link>Email</Link>
                  <Link>Call</Link>
                </HStack>
              </Flex>
            </Flex>
            <Code
              bg="gray.50"
              children="npm install chakra"
              p="2"
              width={"94%"}
              mx="4"
              my="4"
            />
            <Flex
              direction={"column"}
              alignItems="start"
              justifyContent={"start"}
              p="4"
            >
              <Flex direction={"column"} mb="4">
                <Text fontSize={"md"} fontWeight="semibold">
                  About me :
                </Text>
                <Text>
                  Hi I'm Johnathn Deo,has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type.
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Text fontSize={"md"} fontWeight="semibold">
                  DATE OF BIRTH :
                </Text>
                <Text>March 23, 1984 (34 Years).</Text>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </React.Fragment>
  );
};

export default Employee;
