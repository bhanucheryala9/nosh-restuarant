import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import { Table, Tag } from "antd";
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
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { ColumnsType } from "antd/es/table";
import AddEmployee from "./AddEmployee";
import { EmployeeTestData } from "../../../test-data/admin/employee";
import { EmailIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {faker }from '@faker-js/faker';

interface EmployeeDatatype {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  employeeType: string;
  address: string;
  salary: string;
  joinedDate: string;
}
const Employee = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addEmployeeModal, setAddEmployeeModal] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<Array<EmployeeDatatype>>([]);
  const [userProfile, setUserProfile] = useState<EmployeeDatatype>(
    employeeData[0]
  );
  const columns: ColumnsType<EmployeeDatatype> = [
    {
      title: "Emplyee ID",
      dataIndex: "id",
      responsive: ["sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      responsive: ["sm"],
      render: (text: string) => {
        return (
          <HStack>
            <Avatar
              size={"sm"}
              name="Ryan Florence"
              src={faker.image.avatar()}
            />
            <Text textColor="gray.600" fontWeight={"semibold"}>
              {text}
            </Text>
            ,
          </HStack>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      responsive: ["sm"],
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      responsive: ["sm"],
    },
    {
      title: "Employee Type",
      dataIndex: "employeeType",
      responsive: ["sm"],
      filters: [
        {
          text: "Manager",
          value: "Manager",
        },
        {
          text: "Employee",
          value: "Employee",
        },
      ],
      onFilter: (value: any, record) =>
        record.employeeType.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <>
          {text === "Manager" ? (
            <Tag color={"green"} key={text}>
              {text.toUpperCase()}
            </Tag>
          ) : (
            <Tag color={"blue"} key={text}>
              {text.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      responsive: ["sm"],
    },
    {
      title: "Salary/hr",
      dataIndex: "salary",
      responsive: ["sm"],
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      responsive: ["sm"],
    },
  ];

  console.log("test user profile data", userProfile);

  useEffect(() => {
    const formattedData = EmployeeTestData.reduce(
      (accumulator: any, currentValue) => {
        return [
          ...accumulator,
          {
            key: currentValue.id,
            id: currentValue.id,
            name: currentValue.lastName + " " + currentValue.firstName,
            email: currentValue.email,
            phoneNumber: currentValue.phoneNumber,
            employeeType: currentValue.subtype,
            address:
              currentValue.address.addressLine1 +
              ", " +
              currentValue.address.city +
              ", " +
              currentValue.address.state,
            salary: currentValue.salary,
            joinedDate: currentValue.joinedDate,
          },
        ];
      },
      []
    );
    setEmployeeData(formattedData);
    setUserProfile(formattedData[0]);
  }, []);

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
            <Flex
              bg="white"
              p="6"
              borderRadius={"md"}
              w="100%"
              direction={"column"}
            >
              <Flex justifyContent={"space-between"} mb="4">
                <InputGroup maxW="44" alignItems={"center"}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input variant="filled" placeholder="Search.." />
                </InputGroup>
                <Button
                  colorScheme="orange"
                  onClick={() => setAddEmployeeModal(true)}
                >
                  Add Employee
                </Button>
              </Flex>
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setUserProfile(record);
                    },
                  };
                }}
                style={{ width: "100%" }}
                size="large"
                rowSelection={rowSelection as any}
                columns={columns}
                dataSource={employeeData}
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
                  {userProfile?.name}
                </Text>
                <Text textColor={"gray.700"}>{userProfile?.employeeType}</Text>
                <HStack mt="4" gap={4}>
                  <HStack>
                    <Icon as={EmailIcon} />

                    <Link>Email</Link>
                  </HStack>
                  <HStack>
                    <Icon as={PhoneIcon} />
                    <Link>Call</Link>
                  </HStack>
                </HStack>
              </Flex>
            </Flex>
            <Code
              bg="gray.50"
              children="Personal Details"
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
              <VStack gap={"3"} alignItems="start" px="2">
                <Flex direction={"column"}>
                  <Text fontSize={"xs"} fontWeight="bold">
                    About me :
                  </Text>
                  <Text>
                    Hi I'm Johnathn Deo,has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type.
                  </Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"xs"} fontWeight="bold">
                    Email :
                  </Text>
                  <Text>{userProfile?.email}.</Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"xs"} fontWeight="bold">
                    Phone Number :
                  </Text>
                  <Text>{userProfile?.phoneNumber}.</Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"xs"} fontWeight="bold">
                    Joined Date :
                  </Text>
                  <Text>{userProfile?.joinedDate}.</Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"xs"} fontWeight="bold">
                    Salary :
                  </Text>
                  <Text>{userProfile?.salary}.</Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"xs"} fontWeight="bold">
                    Address :
                  </Text>
                  <Text>{userProfile?.address}.</Text>
                </Flex>
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>

      <AddEmployee
        isModalOpen={addEmployeeModal}
        setIsModalOpen={setAddEmployeeModal}
      />
    </React.Fragment>
  );
};

export default Employee;
