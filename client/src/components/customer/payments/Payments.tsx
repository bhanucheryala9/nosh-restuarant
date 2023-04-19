import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import payments from "../../../assets/payments.jpg";
import { useForm } from "react-hook-form";
import { SiAmazonpay } from "react-icons/si";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useAppStore } from "../../../contexts/AppStoreContext";
import { OrderInfo } from "../orders/OrderItem";
import axios from "axios";
import { NotificationStatus, generateUID, cartData } from "../../common/utils";
import { useNotification } from "../../../contexts/Notification";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiTwotoneHome } from "react-icons/ai";
import { FaAmazonPay } from "react-icons/fa";
import _ from "lodash";
import { Empty } from "antd";
export interface OrdersInfo {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: Number;
  address: {
    addressLine1: string;
    addressLine2: string;
    state: String;
    city: string;
    zipcode: string;
  };
  orderDetails: Array<OrderInfo>;
  totalAmount?: Number;
  orderStatus?: string;
  isPaid: boolean;
  paymentId: string;
}

const Payments = () => {
  const [orderInfo, setOrdersInfo] = useState<OrdersInfo>();
  const [cartItems, setCartItems] = useState([]);
  const [changeAddress, setChangeAddress] = useState<boolean>(false);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [getCardDetails, setCardDetails] = useState("");
  const PUBLIC_KEY =
    "pk_test_51MRoZSEJARdSUOyGpBTo9LW9MXKYWhEy5PGftOfHI3YasBUDzxcF4umdaepjM6l0MDduck6jfImEuZuZaWi94Iwz00SPobKMl7";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  const { setShowNotification } = useNotification();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo") || "");
    const user = {
      firstName: userinfo?.firstName,
      lastName: userinfo?.lastName,
      address: userinfo?.address,
      email: userinfo?.email,
    };
    setOrdersInfo({ ...orderInfo, ...(user as any) });
    const cartinfo = JSON.parse(localStorage.getItem("orders") || "")?.filter(
      (item: any) => item.quantity !== 0
    );
    setCartItems(cartinfo);
    const amount = cartinfo?.reduce((acc: any, item: OrderInfo) => {
      return acc + item?.quantity * item?.price;
    }, 0);
    setFinalAmount(amount);
  }, []);

  const navigate = useNavigate();

  const prepareData = () => {
    const orders = JSON.parse(localStorage.getItem("orders") as any);
    const payload = {
      ...orderInfo,
      orderId: "o" + generateUID(),
      paymentId: getCardDetails,
      orderDetails: orders,
      totalAmount: (finalAmount + Number((finalAmount / 8).toFixed(2))) * 100,
      orderStatus: "processing",
    };
    axios
      .post("http://localhost:5000/api/customer/v1/place-order", payload)
      .then((response) => {
        console.log("********** response of order", response.data.orders);
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Orders Placed successfully..!",
          showAlert: true,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("************** error", error);
      });
  };

  return (
    <Flex direction={"column"} justifyContent="center">
      <form>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={3}
          my="6"
          mx="10"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Flex
              py="6"
              px="8"
              bg="white"
              borderRadius={"xl"}
              shadow="base"
              direction={"column"}
            >
              <Text
                textColor={"orange.500"}
                fontSize="xl"
                fontWeight={"semibold"}
                mb="4"
              >
                {_.upperCase("Payment Info")}
              </Text>
              <Flex
                p="4"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                alignItems="center"
                bg="gray.100"
              >
                <Flex alignItems="center">
                  <BsPersonCircle style={{ fontSize: "30px" }} />
                  <VStack justifyContent="start" alignItems="start" ml="4">
                    <Text fontWeight="semibold">PERSONAL DETAILS</Text>
                    <Text fontSize="sm">
                      {`${
                        orderInfo?.lastName === undefined
                          ? ""
                          : orderInfo?.lastName
                      }  ${
                        orderInfo?.firstName === undefined
                          ? ""
                          : orderInfo?.firstName
                      }, ${
                        orderInfo?.email === undefined ? "" : orderInfo?.email
                      }`}
                    </Text>
                  </VStack>
                </Flex>
              </Flex>

              <Flex
                p="4"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                alignItems="center"
                justifyContent="space-between"
                bg="gray.100"
                mt="3"
              >
                <Flex alignItems="center">
                  <AiTwotoneHome style={{ fontSize: "30px" }} />
                  <VStack justifyContent="start" alignItems="start" ml="4">
                    <Text fontWeight="semibold">ADDRESS</Text>
                    <Box>
                      <Text fontSize="sm">
                        {`${
                          orderInfo?.address?.addressLine1 === undefined
                            ? ""
                            : orderInfo?.address?.addressLine1
                        } ${
                          orderInfo?.address?.addressLine2 === undefined
                            ? ""
                            : orderInfo?.address?.addressLine2
                        }, ${
                          orderInfo?.address?.city === undefined
                            ? ""
                            : orderInfo?.address?.city
                        }, ${
                          orderInfo?.address?.state === undefined
                            ? ""
                            : orderInfo?.address?.state
                        }, ${
                          orderInfo?.address?.state === undefined ? "" : "12208"
                        }`}
                      </Text>
                      <Text fontSize="sm">United States</Text>
                    </Box>
                  </VStack>
                </Flex>
                <Button
                  colorScheme="orange"
                  onClick={() => setChangeAddress(true)}
                >
                  Change
                </Button>
              </Flex>

              <Flex
                p="4"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                alignItems="start"
                bg="gray.100"
                my="3"
                direction="column"
              >
                <Flex>
                  <FaAmazonPay style={{ fontSize: "30px" }} />
                  <Text fontWeight="semibold" ml="3">
                    CREDIT / DEBIT CARD
                  </Text>
                </Flex>
                <Box width="100%" mt="4">
                  <FormControl>
                    <FormLabel>Enter card holder name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter card holder name"
                      borderColor="gray.400"
                    />
                  </FormControl>
                  <Box
                    my="6"
                    border={"1px solid"}
                    borderColor="gray.400"
                    borderRadius={"md"}
                    p="3"
                  >
                    <Elements stripe={stripeTestPromise}>
                      <PaymentForm setCardDetails={setCardDetails} />
                    </Elements>
                  </Box>
                </Box>
                <Divider my="2" />

                <Flex width="100%" justifyContent="end">
                  <Button
                    colorScheme={"orange"}
                    mt="3"
                    // type="submit"
                    onClick={prepareData}
                    w="56"
                    float="right"
                  >
                    Proceed Now
                  </Button>
                </Flex>
              </Flex>
              {/* <Grid
                templateRows="repeat(6, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["firstName"]}>
                    <FormLabel
                      id="firstName"
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      First Name:
                    </FormLabel>
                    <Input
                      type={"text"}
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          firstName: e.target.value,
                        } as any)
                      }
                    />
                    <FormErrorMessage>
                      {errors["firstName"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["lastName"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Last Name:
                    </FormLabel>
                    <Input
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          lastName: e.target.value,
                        } as any)
                      }
                    />
                    <FormErrorMessage>
                      {errors["lastName"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl isInvalid={!!errors["email"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Email:
                    </FormLabel>
                    <Input
                      {...register("email", {
                        required: "Email is required",
                      })}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          email: e.target.value,
                        } as any)
                      }
                    />
                    <FormErrorMessage>
                      {errors["email"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl isInvalid={!!errors["addressLine1"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Address Line 1:
                    </FormLabel>
                    <Input
                      {...register("addressLine1", {
                        required: "Address Line1 is required",
                      })}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          address: {
                            ...orderInfo?.address,
                            addressLine1: e.target.value,
                          },
                        } as any)
                      }
                    />
                    <FormErrorMessage>
                      {errors["addressLine1"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Address Line 2:
                    </FormLabel>
                    <Input
                      {...register("addressLine2")}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          address: {
                            ...orderInfo?.address,
                            addressLine2: e.target.value,
                          },
                        } as any)
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["city"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      City:
                    </FormLabel>
                    <Input
                      {...register("city", {
                        required: "City is required",
                      })}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          address: {
                            ...orderInfo?.address,
                            city: e.target.value,
                          },
                        } as any)
                      }
                    />
                    <FormErrorMessage>
                      {errors["city"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["state"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      State:
                    </FormLabel>
                    <Input
                      {...register("state", {
                        required: "State is required",
                      })}
                      onChange={(e) =>
                        setOrdersInfo({
                          ...orderInfo,
                          address: {
                            ...orderInfo?.address,
                            state: e.target.value,
                          },
                        } as any)
                      }
                    />
                    <FormErrorMessage>
                      {errors["state"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem
                  colSpan={1}
                  justifyContent="end"
                  display={"flex"}
                ></GridItem>
              </Grid> */}
            </Flex>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Flex
              py="6"
              px="8"
              bg="white"
              borderRadius={"xl"}
              shadow="base"
              direction={"column"}
            >
              <Text
                textColor={"orange.500"}
                fontSize="xl"
                fontWeight={"semibold"}
                mb="4"
              >
                Orders Information
              </Text>
              <Flex
                justifyContent="center"
                direction="column"
                alignItems="center"
              >
                {cartItems.filter((item: any) => item.quantity !== 0).length !==
                0 ? (
                  <Flex direction="column" width="100%">
                    {cartItems
                      ?.filter((item: any) => item.quantity !== 0)
                      ?.map((data: any) => {
                        return (
                          <Flex
                            bg="gray.100"
                            py="3"
                            px="4"
                            direction={"column"}
                            borderRadius={"lg"}
                            mt="3"
                            w="100%"
                          >
                            <Flex>
                              <Image
                                src={data.url}
                                width={"50px"}
                                height={"50px"}
                                borderRadius={"lg"}
                              />
                              <Flex direction={"column"} ml="6">
                                <Text fontSize={"md"} fontWeight={"semibold"}>
                                  {_.capitalize(data.productName)}
                                </Text>
                                <Text>Quantity: {data.quantity}</Text>
                              </Flex>
                            </Flex>
                          </Flex>
                        );
                      })}
                    <Divider my="6" />
                    {/* <VStack mt="3" width="100%" px="3">
                  <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="semibold">Tax</Text>
                    <Text>${amount.tax}</Text>
                  </Flex>
                  <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="semibold">Sub Total</Text>
                    <Text>${amount.total}</Text>
                  </Flex>
                </VStack>
                <Divider mt="3" />
                <Flex justifyContent="space-between" width="100%" px="3">
                  <Text fontWeight="semibold">Total</Text>
                  <Text>${amount.total + amount.tax}</Text>
                </Flex> */}
                  </Flex>
                ) : (
                  <Flex mt="16">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{ height: 100 }}
                      description="No Cart Data..."
                    />
                  </Flex>
                )}
              </Flex>
              <FormControl mb="2">
                <FormLabel>Promo Code</FormLabel>
                <Input type="text" placeholder="Enter Promo Code" />
              </FormControl>
              <Divider my="3" />

              <Flex width={"100%"} justifyContent="space-between" my="2">
                <Text fontSize={"md"} fontWeight="semibold">
                  Sub Total
                </Text>
                <Text fontSize={"lg"} fontWeight="semibold">
                  ${finalAmount ? finalAmount.toFixed(2) : 0}
                </Text>
              </Flex>
              <Flex width={"100%"} justifyContent="space-between" my="2">
                <Text fontSize={"md"} fontWeight="semibold">
                  Tax
                </Text>
                <Text fontSize={"lg"} fontWeight="semibold">
                  ${finalAmount ? (finalAmount / 8).toFixed(2) : 0}
                </Text>
              </Flex>
              <Divider my="2" />
              <Flex width={"100%"} justifyContent="space-between" my="2">
                <Text fontSize={"lg"} fontWeight="semibold">
                  Total
                </Text>
                <Text fontSize={"lg"} fontWeight="semibold">
                  $
                  {finalAmount ? (finalAmount + finalAmount / 8).toFixed(2) : 0}
                </Text>
              </Flex>
              {/* <Divider my="2" /> */}
              {/* <Button
                rightIcon={<SiAmazonpay />}
                colorScheme={"orange"}
                mt="3"
                type="submit"
              >
                Proceed to Pay
              </Button> */}
            </Flex>
          </GridItem>
        </Grid>
      </form>
      <Modal
        closeOnOverlayClick={false}
        isOpen={changeAddress}
        onClose={() => setChangeAddress(false)}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor={"orange.500"}>Change Address</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody p={8}>
            <Grid
              templateRows="repeat(6, 1fr)"
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={1} colSpan={1}>
                <FormControl>
                  <FormLabel
                    id="firstName"
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    First Name:
                  </FormLabel>
                  <Input
                    type={"text"}
                    {...register("firstName", {
                      // required: "First Name is required",
                    })}
                    defaultValue={(orderInfo as any)?.firstName}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        firstName: e.target.value,
                      } as any)
                    }
                  />
                  {/* <FormErrorMessage>
                    {errors["firstName"]?.message as string}
                  </FormErrorMessage> */}
                </FormControl>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Last Name:
                  </FormLabel>
                  <Input
                    {...register("lastName", {
                      // required: "Last Name is required",
                    })}
                    defaultValue={(orderInfo as any)?.lastName}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        lastName: e.target.value,
                      } as any)
                    }
                  />
                  <FormErrorMessage>
                    {errors["lastName"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Email:
                  </FormLabel>
                  <Input
                    {...register("email", {
                      // required: "Email is required",
                    })}
                    defaultValue={(orderInfo as any)?.email}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        email: e.target.value,
                      } as any)
                    }
                  />
                  <FormErrorMessage>
                    {errors["email"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Address Line 1:
                  </FormLabel>
                  <Input
                    {...register("addressLine1", {
                      // required: "Address Line1 is required",
                    })}
                    defaultValue={(orderInfo as any)?.address?.addressLine1}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        address: {
                          ...orderInfo?.address,
                          addressLine1: e.target.value,
                        },
                      } as any)
                    }
                  />
                  <FormErrorMessage>
                    {errors["addressLine1"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Address Line 2:
                  </FormLabel>
                  <Input
                    {...register("addressLine2")}
                    defaultValue={(orderInfo as any)?.address?.addressLine2}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        address: {
                          ...orderInfo?.address,
                          addressLine2: e.target.value,
                        },
                      } as any)
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    City:
                  </FormLabel>
                  <Input
                    {...register("city", {
                      // required: "City is required",
                    })}
                    defaultValue={(orderInfo as any)?.address?.city}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        address: {
                          ...orderInfo?.address,
                          city: e.target.value,
                        },
                      } as any)
                    }
                  />
                  <FormErrorMessage>
                    {errors["city"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    State:
                  </FormLabel>
                  <Input
                    {...register("state", {
                      required: "State is required",
                    })}
                    defaultValue={(orderInfo as any)?.address?.state}
                    onChange={(e) =>
                      setOrdersInfo({
                        ...orderInfo,
                        address: {
                          ...orderInfo?.address,
                          state: e.target.value,
                        },
                      } as any)
                    }
                  />
                  <FormErrorMessage>
                    {errors["state"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}></GridItem>
              <GridItem
                colSpan={1}
                justifyContent="end"
                display={"flex"}
              ></GridItem>
            </Grid>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <FormControl>
              <HStack float={"right"}>
                <Button onClick={() => setChangeAddress(false)}>Cancel</Button>
                <Button
                  colorScheme="orange"
                  mr={3}
                  onClick={() => setChangeAddress(false)}
                >
                  Save Address
                </Button>
              </HStack>
            </FormControl>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Payments;
