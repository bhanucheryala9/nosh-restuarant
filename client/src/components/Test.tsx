import {
  Button,
  Code,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  StackDivider,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Divider, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import React, { createRef, useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FaInbox } from "react-icons/fa";
import { Segmented, Space } from "antd";
import { useNotification } from "../contexts/Notification";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Steps } from "antd";
import { SearchIcon } from "@chakra-ui/icons";
import orderPlaced from "../assets/order-placed.jpg";
import accepted from "../assets/accepted.jpg";
import preparing from "../assets/preparing.jpg";
import ready from "../assets/ready.jpg";
import { ImCancelCircle } from "react-icons/im";
const Test = () => {
  const [trackorder, setTrackOrder] = useState();
  const [stepDetails, setStepDetails] = useState(0);
  const userID = JSON.parse(
    localStorage?.getItem("userInfo") || ("{}" as string)
  );

  const getStatusNames = (status: string) => {
    if (status === "processing") {
      return "Order Placed";
    } else if (status === "preparing") {
      return "Preparing";
    } else if (status === "ready") {
      return "Ready for pick up";
    }
  };

  const statuses = ["processing", "preparing", "ready"];

  const getCurrentStep = (status: string) => {
    const num = statuses.indexOf(status);
    return num + 1;
  };

  const statusProps = [
    {
      title: (
        <Flex alignItems="center">
          <Image src={orderPlaced} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold" fontSize="md">
            {" "}
            Order Placed
          </Text>
        </Flex>
      ),
    },
    {
      title: (
        <Flex alignItems="center">
          <Image src={accepted} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold">
            {" "}
            Order Accepted
          </Text>
        </Flex>
      ),
    },
    {
      title: (
        <Flex alignItems="center">
          <Image src={preparing} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold">
            {" "}
            Preparing
          </Text>
        </Flex>
      ),
    },
    {
      title: (
        <Flex alignItems="center">
          <Image src={ready} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold">
            {" "}
            Ready
          </Text>
        </Flex>
      ),
    },
  ];

  const getData = () => {
    axios
      .get("http://localhost:5000/api/customer/v1/get-order-details-by-id", {
        params: {
          id: "o17651",
        },
      })
      .then((response) => {
        setTrackOrder(response.data.orders);
        const status = response.data?.orders?.orderStatus;
        setStepDetails(getCurrentStep(status));
      })
      .catch((error) => {
        console.log("************** error", error);
      });
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      getData();
    }, 2000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <React.Fragment>
      <Flex w="100%" justifyContent="center" alignItems="center">
        <Flex
          bg="white"
          rounded={"2xl"}
          my="4"
          mx="6"
          px="10"
          py="6"
          maxW="60%"
          direction="column"
          alignItems="center"
          shadow="md"
        >
          <Text textColor="orange.500" fontSize="2xl" fontWeight="semibold">
            Check Your Status
          </Text>
          <Divider />
          <HStack justifyContent="space-between" w="100%">
            <Text>Name: BHANU CHERYALA</Text>
            <Text> ORDER ID: #0111111</Text>
          </HStack>
          <Flex mt="16" width="100%">
            {stepDetails !== -1 ? (
              <Steps
                style={{ width: "100%" }}
                progressDot
                current={stepDetails}
                direction="horizontal"
                items={statusProps}
              />
            ) : (
              <Flex w="550px" direction="column" alignItems="center" mt="3">
                <ImCancelCircle fontSize="40px" color="red" />
                <Text
                  mt="6"
                  fontSize="lg"
                  textColor="red.500"
                  fontWeight="semibold"
                >
                  {" "}
                  Order Cancelled
                </Text>
                <Text>Please contact restaurant...! </Text>
              </Flex>
            )}
          </Flex>
          <Button colorScheme="orange" mt="10" mb="6">
            Back to Home Page
          </Button>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default Test;
