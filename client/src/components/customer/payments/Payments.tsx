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
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import payments from "../../../assets/payments.jpg";
import { useForm } from "react-hook-form";
import { SiAmazonpay } from "react-icons/si";
import StripeContainer from "./StripeContainer";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useAppStore } from "../../../contexts/AppStoreContext";
import { OrderInfo } from "../orders/OrderItem";
import axios from "axios";
import { generateUID } from "../../common/utils";

export interface OrdersInfo {
  orderId: string,
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
  const [finalAmount , setFinalAmount] = useState<number>(0);
  const [getCardDetails, setCardDetails] = useState('');
  const PUBLIC_KEY =
    "pk_test_51MRoZSEJARdSUOyGpBTo9LW9MXKYWhEy5PGftOfHI3YasBUDzxcF4umdaepjM6l0MDduck6jfImEuZuZaWi94Iwz00SPobKMl7";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  const { AppStoreData, setAppStoreData } = useAppStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  useEffect(()=>{
    const amount = AppStoreData?.finalCartData?.reduce((acc: any, item: OrderInfo) => {
      return acc + item?.quantity * item?.price;
    }, 0);
    setFinalAmount(amount)
  },[])

  const prepareData = () => {
    // orderDetails: AppStoreData?.finalCartData,
    const orders = JSON.parse(localStorage.getItem("orders")as any);
    const payload = {...orderInfo, orderId: "o"+generateUID(),paymentId: getCardDetails, orderDetails: orders, totalAmount: 100, orderStatus:"processing"};
    axios.post("http://localhost:5000/api/customer/v1/place-order",payload).then((response)=>{
      console.log("********** response of order", response.data.orders)
    }).catch((error)=>{
      console.log("************** error", error)
    })
  };

  return (
    <Flex direction={"column"} justifyContent="center">
      <Flex justifyContent={"center"} direction="column" alignItems={"center"}>
        <Image
          src={payments}
          width={"100%"}
          height="72"
          filter={"auto"}
          brightness="50%"
        />
        <Flex
          bg={"white"}
          rounded="lg"
          py="4"
          px="28"
          mt="-10"
          zIndex={10}
          shadow="base"
        >
          <Text
            fontSize={"2xl"}
            fontWeight="semibold"
            fontFamily={"'Nunito', sans-serif"}
          >
            Payments Section
          </Text>
        </Flex>
      </Flex>
      <form onSubmit={handleSubmit(prepareData)}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={3}
          my="6"
          mx="10"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Flex
              py="4"
              px="8"
              bg="white"
              borderRadius={"md"}
              shadow="base"
              direction={"column"}
            >
              <Text
                textColor={"orange.500"}
                fontSize="xl"
                fontWeight={"semibold"}
                mb="4"
              >
                Payment Info
              </Text>
              <Grid
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
              </Grid>
            </Flex>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box py="4" px="6" bg="white" borderRadius={"md"} shadow="base">
              <Box>
                <FormControl>
                  <FormLabel>Enter card holder name</FormLabel>
                  <Input type="text" placeholder="Enter card holder name" />
                </FormControl>
                <Box
                  my="6"
                  border={"1px solid"}
                  borderColor="gray.200"
                  borderRadius={"md"}
                  p="3"
                >
                  <Elements stripe={stripeTestPromise}>
                    <PaymentForm  setCardDetails={setCardDetails} />
                  </Elements>
                </Box>
              </Box>
              <Divider />

              <Flex direction={"column"}>
                <Text
                  textColor={"orange.500"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                  mb="4"
                >
                  Orders Information
                </Text>
                <FormControl mb="2">
                  <FormLabel>Promo Code</FormLabel>
                  <Input type="text" placeholder="Enter Promo Code" />
                </FormControl>

                <Flex width={"100%"} justifyContent="space-between" my="2">
                  <Text fontSize={"lg"}>Sub Total</Text>
                  <Text fontSize={"lg"} fontWeight="semibold">
                    $20
                  </Text>
                </Flex>
                <Flex width={"100%"} justifyContent="space-between" my="2">
                  <Text fontSize={"lg"}>Tax</Text>
                  <Text fontSize={"lg"} fontWeight="semibold">
                    $5
                  </Text>
                </Flex>
                <Divider my="2" />
                <Flex width={"100%"} justifyContent="space-between" my="2">
                  <Text fontSize={"lg"}>Total</Text>
                  <Text fontSize={"lg"} fontWeight="semibold">
                    ${finalAmount}
                  </Text>
                </Flex>
                <Divider my="2" />
                <Button
                  rightIcon={<SiAmazonpay />}
                  colorScheme={"orange"}
                  mt="3"
                  type="submit"
                >
                  Proceed to Pay
                </Button>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </form>
    </Flex>
  );
};

export default Payments;
