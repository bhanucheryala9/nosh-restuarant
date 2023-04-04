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

interface EInventoryColumns {
  id: string;
  productName: string;
  description: string;
  price: string;
  discount: number;
  url: string;
  isAvailable: boolean;
  tax: number;
  category: string;
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
  Inventorytatus: string;
  createdAt: Date | string;
}
const EInventory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [eInventoryData, setEInventoryData] = useState<EInventoryColumns[]>([]);
  const [tableData, setTableData] = useState<EorderTableColumns[]>([]);
  const [orderChangeDetails, setOrderChangeDetails] = useState({
    orderId: "",
    Inventorytatus: "processing",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState();

  const { setShowNotification } = useNotification();
  const navigate = useNavigate();
  const { AppStoreData, setAppStoreData } = useAppStore();

  // const prepareData = (data: EInventoryColumns[]) => {
  //   const formattedData = data.reduce((accumulator: any, currentValue) => {
  //     return [
  //       ...accumulator,
  //       {
  //         id: currentValue.if,
  //         orderId: currentValue.orderId,
  //         name: currentValue.lastName + " " + currentValue.firstName,
  //         email: currentValue.email,
  //         orderDetails: currentValue.orderDetails,
  //         noOfItems: currentValue.orderDetails?.length || 0,
  //         totalAmount: currentValue.totalAmount,
  //         Inventorytatus: currentValue.Inventorytatus,
  //         createdAt: currentValue.createdAt,
  //       },
  //     ];
  //   }, []);
  //   return formattedData;
  // };
  const onDeleteClicked = (data: any) => {
    axios
      .delete("http://localhost:5000/api/admin/v1/delete-item", {
        params: {
          id: data.id,
        },
      })
      .then((response: any) => {
        setEInventoryData(response.data.items);
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

  const onUpdateClicked = (data: any) => {
    setToUpdateData(data);
    setForUpdate(true);
    setAppStoreData({
      ...AppStoreData,
      eInventoryData: {
        eInventoryUpdateData: data,
        forUpdate: true,
      },
    });
    navigate("/add-eInventory");
  };

  const onInventorytatusChange = (orderID: string, status: boolean) => {
    const itemNeedtoUpdate = eInventoryData?.map((item) => {
      if (item.id === orderID) {
        return { ...item, isAvailable: status };
      }
    });

    console.log(
      "************** tesing complte data of item:",
      itemNeedtoUpdate[0]
    );
    setIsLoading(true);
    axios
      .put(
        "http://localhost:5000/api/admin/v1/update-items-status",
        itemNeedtoUpdate[0]
      )
      .then((response) => {
        setEInventoryData(response.data.items);
        // setTableData(prepareData(response.data.items));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const columns: ColumnsType<EInventoryColumns> = [
    {
      title: "Id",
      dataIndex: "id",
      render: (text) => (
        <>
          <Link>{_.upperCase(text)}</Link>
        </>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Item Status",
      dataIndex: "isAvailable",
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
                    onClick={() => onInventorytatusChange(record.id, true)}
                  >
                    Available
                  </MenuItem>
                  <MenuItem
                    onClick={() => onInventorytatusChange(record.id, false)}
                  >
                    Not Available
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
      ),
    },
  ];


  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/admin/v1/get-employee-items")
      .then((response) => {
        setEInventoryData(response.data.items);
        // setTableData(prepareData(response.data.items));
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
          Items Dashboard
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
          dataSource={eInventoryData}
        />
      </Flex>
    </Flex>
  );
};

export default EInventory;
