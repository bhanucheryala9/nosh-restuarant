import React, { useEffect, useRef, useState } from "react";
import { Input, InputRef, Space, Table, Tag } from "antd";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Avatar,
  HStack,
  Link,
  Code,
  VStack,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { ColumnsType } from "antd/es/table";
import AddEmployee from "./AddEmployee";
import { DeleteIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { useNotification } from "../../../contexts/Notification";
import { NotificationStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import { AiOutlineSearch } from "react-icons/ai";

export interface EmployeeDatatype {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  employeeType: string;
  address: string;
  salary: string;
  joinedDate: string;
  about?: string;
}
const Employee=()=>{
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addEmployeeModal, setAddEmployeeModal] = useState<boolean>(false);
  const [unformattedEmployeeData, setunformattedEmployeeData] = useState([]);
  const [employeeData, setEmployeeData] = useState<Array<EmployeeDatatype>>([]);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<EmployeeDatatype>(
    employeeData[0]
  );
  const [initialFormData, setInitialFormData] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof EmployeeDatatype;

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

  const columns: ColumnsType<EmployeeDatatype> = [
    {
      title: "Emplyee ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
      render: (text: string) => {
        useEffect(() => {
            axios
              .get("http://34.235.166.147:5000/api/admin/v1/get-employee-details")
              .then((response: any) => {
                setunformattedEmployeeData(response.data.employees);
                setEmployeeData(prepareData(response.data.employees));
              })
              .catch(() => {
                setShowNotification({
                  status: NotificationStatus.ERROR,
                  alertMessage: "Failed to retreive employees information..!",
                  showAlert: true,
                });
              });
          }, [addEmployeeModal]);
        
        return (
          <HStack>
            <Avatar
              size={"sm"}
              bg='orange.400'
              textColor="white"
              name={text}
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
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Employee Type",
      dataIndex: "employeeType",
      filters: [
        {
          text: "Manager",
          value: "manager",
        },
        {
          text: "Employee",
          value: "employee",
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
    },
    {
      title: "Salary/hr",
      dataIndex: "salary",
    },
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          <IconButton
            aria-label="Search database"
            onClick={() => {
              onDeleteClicked(record);
            }}
            icon={<DeleteIcon />}
            size="sm"
          />
          <IconButton
            aria-label="Search database"
            onClick={() => onUpdateClicked(record)}
            icon={<EditIcon />}
            size="sm"
          />
        </HStack>
      ),
    },
   
  ];

  const { setShowNotification } = useNotification();
  const navigate = useNavigate();


    return(
        <React.Fragment>
      <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
        <Text fontSize={"xl"} fontWeight="bold">
          Employees List
        </Text>
        <Grid
          mt="4"
          templateRows={{ base: "repeat(2, 1fr)", lg: "repeat(1, 1fr)" }}
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(6, 1fr)" }}
          gap={{ base: 2, lg: 4 }}
        >
          <GridItem colSpan={{ base: 1, lg: 4 }}>
            <Flex
              bg="white"
              p="6"
              borderRadius={"md"}
              w="100%"
              direction={"column"}
            >
              <Flex justifyContent={"end"} mb="4">
                {/* <InputGroup maxW="44" alignItems={"center"} rounded="md">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input
                    variant="filled"
                    placeholder="Search.."
                    size={{ base: "sm" }}
                  />
                </InputGroup> */}
                <Button
                  size={{ base: "sm", lg: "md" }}
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
                scroll={{ x: 400 }}
                style={{ width: "100%" }}
                size="large"
                // rowSelection={rowSelection as any}
                columns={columns}
                dataSource={employeeData}
              />
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
                  <Text>{userProfile?.about}</Text>
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
        defaultData={initialFormData}
        isUpdate={forUpdate}
        setIsUpdate={setForUpdate}
      />
    </React.Fragment>

);
};
export default Employee;
