import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  Text,
  Link,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../../contexts/Notification";
import Loader from "../../common/Loader";
import { NotificationStatus, getStatusColors } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../contexts/AppStoreContext";
import _ from "lodash";
import { AiOutlineMore } from "react-icons/ai";

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
const EOrders = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [eordersData, setEOrdersData] = useState<EOrdersColumns[]>([]);
  const [tableData, setTableData] = useState<EorderTableColumns[]>([]);
  const [orderChangeDetails, setOrderChangeDetails] = useState({
    orderId: "",
    orderStatus: "processing",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState();

  const { setShowNotification } = useNotification();
  const navigate = useNavigate();
  const { AppStoreData, setAppStoreData } = useAppStore();

  const prepareData = (data: EOrdersColumns[]) => {
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
  const onDeleteClicked = (data: any) => {
    axios
      .delete("http://localhost:5000/api/admin/v1/delete-item", {
        params: {
          id: data.id,
        },
      })
      .then((response: any) => {
        setEOrdersData(response.data.items);
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Successfully deleted item!",
          showAlert: true,
        });
      })
      .catch(() => {
        setShowNotification({
          status: NotificationStatus.ERROR,
          alertMessage: "Failed to retreive items information..!",
          showAlert: true,
        });
      });
  };

  // const getActualData = (data:any) =>{
  //   const userData  =  unformattedEmployeeData.filter((item:any)=> item.id.toLowerCase()=== data.id.toLowerCase());
  //   return userData[0];
  // }
  const onUpdateClicked = (data: any) => {
    setToUpdateData(data);
    setForUpdate(true);
    setAppStoreData({
      ...AppStoreData,
      eordersData: {
        eordersUpdateData: data,
        forUpdate: true,
      },
    });
    navigate("/add-eorders");
  };

  const onOrderStatusChange = (orderID: string, status: string) => {
    let itemData = eordersData?.filter((item) => item.orderId === orderID);
    const itemNeedtoUpdate = { ...itemData[0], orderStatus: status };
    setIsLoading(true);
    axios
      .put(
        "http://localhost:5000/api/admin/v1/update-order-status",
        itemNeedtoUpdate
      )
      .then((response) => {
        setEOrdersData(response.data.items);
        setTableData(prepareData(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const columns: ColumnsType<EorderTableColumns> = [
    {
      title: "Id",
      dataIndex: "orderId",
      render: (text) => (
        <>
          <Link>{_.upperCase(text)}</Link>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "No of Items",
      dataIndex: "noOfItems",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
    },
    // {
    //   title: "Is Available",
    //   dataIndex: "isPaid",
    //   render: (text) => (
    //     <>
    //       {text ? (
    //         <Tag
    //           size={"md"}
    //           key={"yes"}
    //           borderRadius="full"
    //           variant="solid"
    //           colorScheme="green"
    //           p="1"
    //         >
    //           <TagLabel mx="4">Yes</TagLabel>
    //         </Tag>
    //       ) : (
    //         <Tag
    //           size={"md"}
    //           key={"no"}
    //           borderRadius="full"
    //           variant="solid"
    //           colorScheme="red"
    //           p="1"
    //         >
    //           <TagLabel mx="4">No</TagLabel>
    //         </Tag>
    //       )}
    //     </>
    //   ),
    // },
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
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          {/* <IconButton
            aria-label="Search database"
            onClick={() => {
              onDeleteClicked(record);
            }}
            icon={<DeleteIcon />}
            size="sm"
          /> */}
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<AiOutlineMore />}
                  size="sm"
                ></MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      onOrderStatusChange(record.orderId, "accepted")
                    }
                  >
                    Accepted
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      onOrderStatusChange(record.orderId, "preparing")
                    }
                  >
                    Preparing
                  </MenuItem>
                  <MenuItem
                    onClick={() => onOrderStatusChange(record.orderId, "ready")}
                  >
                    Ready
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
      ),
    },
  ];

  console.log("***************** dataq need to update", orderChangeDetails);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/admin/v1/get-orders")
      .then((response) => {
        setEOrdersData(response.data.items);
        setTableData(prepareData(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
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
      {isLoading ? <Loader /> : null}
      <Flex justifyContent={"space-between"}>
        <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
          Orders Dashboard
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
          //   scroll={{ x: 400 }}
          size="large"
          rowSelection={rowSelection as any}
          columns={columns}
          dataSource={tableData}
        />
      </Flex>
    </Flex>
  );
};

export default EOrders;
