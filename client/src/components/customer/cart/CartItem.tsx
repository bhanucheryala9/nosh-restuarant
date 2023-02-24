import {
  Flex,
  HStack,
  Text,
  Image,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import biryani from "../../../assets/biryani.jpg";
import { faker } from "@faker-js/faker";
import { OrderInfo } from "../orders/OrderItem";

const CartItem = (props: OrderInfo) => {
  const { itemID, itemName, category, price, quantity } = props;
  return (
    <Flex my="4" key={itemID}>
      <Flex>
        <Image src={faker.image.food()} maxH={14} maxW={14} borderRadius="lg" />
      </Flex>
      <Flex mx="4" direction={"column"} width="100%">
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"lg"} fontWeight="semibold">
           {itemName}
          </Text>
          <Text fontSize={"lg"} textColor="orange.600" fontWeight={"semibold"}>
            ${price}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"sm"}>X {quantity}</Text>
          <Text>
            <InputGroup
              size="sm"
              colorScheme={"orange"}
              borderColor="orange.500"
            >
              <InputLeftAddon children="-" />
              <Input placeholder="0" defaultValue={0} w={10} />
              <InputRightAddon children="+" />
            </InputGroup>
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartItem;