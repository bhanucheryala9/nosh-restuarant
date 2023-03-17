import {
    Button,
    Code,
    Flex,
    Grid,
    GridItem,
    HStack,
    StackDivider,
    Text,
    Box,
    VStack,
  } from "@chakra-ui/react";
  import { Divider, UploadProps } from "antd";
  import Dragger from "antd/es/upload/Dragger";
  import axios from "axios";
  import React, { createRef, useEffect, useState } from "react";
  import Dropzone from "react-dropzone";
  import { FaInbox } from "react-icons/fa";
  import { Segmented, Space } from "antd";
  import { useNavigate } from "react-router-dom";
  import _ from "lodash";
  import { useNotification } from "../../../contexts/Notification";
  
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
  const EmployeeDashboard = () => {
    const [segmentValue, setSegmentValue] = useState<string>("New");
    const [eordersData, setEOrdersData] = useState<EOrdersColumns[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<EOrdersColumns>();
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
  
    useEffect(() => {
      setIsLoading(true);
      axios
        .get("http://localhost:5000/api/admin/v1/get-orders")
        .then((response) => {
          setEOrdersData(response.data.items);
          setSelectedOrder(response.data.items[0]);
          setTableData(prepareData(response.data.items));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, []);
  
    
  
    return (
      <React.Fragment>
       <Flex mt="4" direction={"column"} alignItems={"end"}>
                <Text fontSize={"lg"} fontWeight={"semibold"}>
                  Total Price: $
                  {((selectedOrder?.totalAmount || 0) / 100).toFixed(2)}
                </Text>
                <Button
                  colorScheme="orange"
                  mt="6"
                  maxW={"40"}
                  onClick={onStatusUpdateClicked}
                >
                  Cancel Order
                </Button>
              </Flex>
      </React.Fragment>
    );
  };
  
  export default EmployeeDashboard;