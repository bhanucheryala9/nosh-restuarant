import React from "react";
import {
  Button,
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


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const Payments = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  

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
                  <Input {...register("addressLine2")} />
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
                  />
                  <FormErrorMessage>
                    {errors["state"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}></GridItem>
              <GridItem colSpan={1} justifyContent="end" display={"flex"}>
                <Button rightIcon={<SiAmazonpay />} colorScheme={"orange"}>
                  Proceed to Pay
                </Button>
              </GridItem>
            </Grid>
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Flex p="4" bg="white" borderRadius={"md"} shadow="base">
            {/* <Elements stripe={null}> */}
              {/* <CardElement options={CARD_OPTIONS as any} /> */}
            {/* </Elements> */}
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Payments;
