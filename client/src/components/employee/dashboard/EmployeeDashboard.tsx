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
  
    const onStatusUpdateClicked = () => {
      const status =
        selectedOrder?.orderStatus === "processing"
          ? "preparing"
          : selectedOrder?.orderStatus === "preparing"
          ? "ready"
          : "ready";
      const payload = { ...selectedOrder, orderStatus: status };
      console.log("*********** updated status payload:", payload);
      setIsLoading(true);
      axios
        .put("http://localhost:5000/api/admin/v1/update-order-status", payload)
        .then((response) => {
          setEOrdersData(response.data.items);
          setTableData(prepareData(response.data.items));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    };
  
    return (
      <React.Fragment>
        <Flex bg="white" rounded={"xl"} my="4" mx="6" px="6" py="6">
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
            width={"100%"}
          >
            <GridItem
              rowSpan={1}
              colSpan={1}
              bg="white"
              rounded={"md"}
              p="4"
              width={"100%"}
            >
              <Text
                fontSize={"2xl"}
                fontWeight={"semibold"}
                mb="4"
                textColor={"orange.600"}
              >
                Orders List
              </Text>
              <Segmented
                size="large"
                options={[
                  { label: "New", value: "processing" },
                  { label: "Preparing", value: "preparing" },
                  { label: "Ready", value: "ready" },
                ]}
                onChange={(value) => {
                  setSegmentValue(value as string);
                }}
                block
              />
              <VStack mt="6" w={"100%"}>
                {eordersData
                  ?.filter((item) => item.orderStatus === segmentValue)
                  ?.map((data) => {
                    return (
                      <Flex
                        bg="gray.100"
                        py="3"
                        px="4"
                        borderRadius={"lg"}
                        width={"100%"}
                        cursor={"pointer"}
                        justifyContent={"space-between"}
                        onClick={() => setSelectedOrder(data)}
                      >
                        <VStack justifyContent={"start"} alignItems={"start"}>
                          <Text textColor={"black"}>
                            ORDER ID{" "}
                            <b>#{data.orderId.toString().toUpperCase()}</b>
                          </Text>
                          <Text fontSize={"xs"} textColor={"gray.500"}>
                            {" "}
                            a few min ago
                          </Text>
                        </VStack>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          ${((data.totalAmount || 0) / 100).toFixed(2)}
                        </Text>
                      </Flex>
                    );
                  })}
              </VStack>
            </GridItem>
  
            <GridItem
              rowSpan={1}
              colSpan={3}
              bg="gray.100"
              rounded={"xl"}
              py="4"
              px="8"
            >
              <Text
                fontSize={"2xl"}
                fontWeight={"semibold"}
                textColor={"orange.600"}
              >
                Order Info{" "}
              </Text>
              <HStack
                divider={<StackDivider borderColor="gray.300" />}
                gap={4}
                my="4"
                width={"100%"}
              >
                <VStack
                  minW={"30%"}
                  alignItems={"start"}
                  gap={0}
                  justifyContent={"start"}
                  justifyItems={"start"}
                >
                  <Text fontSize={"xs"} textColor={"gray.600"}>
                    Order ID
                  </Text>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    {selectedOrder?.orderId?.toUpperCase()}
                  </Text>
                </VStack>
                <VStack minW={"30%"} alignItems={"start"}>
                  <Text fontSize={"xs"} textColor={"gray.600"}>
                    Address
                  </Text>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    {selectedOrder?.address?.addressLine1},{" "}
                    {selectedOrder?.address.city}
                  </Text>
                </VStack>
                <VStack minW={"35%"} alignItems={"start"}>
                  <Text fontSize={"xs"} textColor={"gray.600"}>
                    Personal Details
                  </Text>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    {selectedOrder?.lastName}
                  </Text>
                </VStack>
              </HStack>
              <Flex width={"100%"} mt="10" direction={"column"}>
                {selectedOrder?.orderDetails?.map((item) => {
                  return (
                    <VStack width={"100%"} py="2">
                      <Flex justifyContent={"space-between"} width={"100%"}>
                        <Text fontSize={"large"} fontWeight={"semibold"}>
                          {item.productName}
                        </Text>
                        <HStack gap={20}>
                          <Text fontSize={"md"}>Quantity: {item.quantity}</Text>
                          <Text fontSize={"lg"} fontWeight={"semibold"}>
                            Price: ${item.price}
                          </Text>
                        </HStack>
                      </Flex>
                      <Divider />
                    </VStack>
                  );
                })}
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
                    Accept Order
                  </Button>
                  <Button
                    colorScheme="orange"
                    mt="6"
                    maxW={"40"}
                    onClick={onStatusUpdateClicked}
                  >
                    Accept Order
                  </Button>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </React.Fragment>
    );
  };
  
  export default EmployeeDashboard;