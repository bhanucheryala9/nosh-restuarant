import { Button, Flex, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { Divider, Steps } from "antd";
import axios from "axios";
import React, { createRef, useCallback, useEffect, useState } from "react";
import orderPlaced from "../../..//assets/order-placed.jpg";
import accepted from "../../..//assets/accepted.jpg";
import preparing from "../../..//assets/preparing.jpg";
import ready from "../../..//assets/ready.jpg";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const Tracking = () => {
  const [trackorder, setTrackOrder] = useState();
  const [stepDetails, setStepDetails] = useState(0);

  const statuses = ["processing", "preparing", "ready"];
  const navigate = useNavigate();

  const getCurrentStep = (status: string) => {
    const num = statuses.indexOf(status);
    if(num===-1){
      return -1
    }else{
      return num+1;
    }
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
        <Flex alignItems="center"></Flex>