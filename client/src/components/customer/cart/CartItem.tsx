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
import { faker } from "@faker-js/faker";
import { OrderInfo } from "../orders/OrderItem";

interface CartItemProps {
  item: OrderInfo;
  setCartInfo: React.Dispatch<React.SetStateAction<OrderInfo[]>>;
  cartInfo: OrderInfo[];
}

const CartItem = (props: CartItemProps) => {
  const { item, setCartInfo, cartInfo } = props;

  const prepareData = (option: string) => {
    let updatedData;
    if (option === "add") {
      updatedData = cartInfo?.map((product) => {
        if (product.productName === item.productName) {
          if (product.quantity < 0) {
            return { ...product, quantity: 0 };
          } else {
            return { ...product, quantity: item.quantity + 1 };
          }
        } else {
          return product;
        }
      });
    } else {
      updatedData = cartInfo?.map((product) => {
        if (product.productName === item.productName) {
          if (product.quantity <= 0) {
            return { ...product, quantity: 0 };
          } else {
            return { ...product, quantity: item.quantity - 1 };
          }
        } else {
          return product;
        }
      });
    }
    localStorage.setItem("orders", JSON.stringify(updatedData));
    setCartInfo(updatedData);
  };

  return (
    <Flex my="4" key={item.id}>
      <Flex>
        <Image
          src={item?.url !== "" ? item?.url : faker.image.food()}
          maxH={14}
          maxW={14}
          borderRadius="lg"
        />
      </Flex>
      <Flex mx="4" direction={"column"} width="100%">
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"lg"} fontWeight="semibold">
            {item.productName}
          </Text>
          <Text fontSize={"lg"} textColor="orange.600" fontWeight={"semibold"}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"sm"}>X {item.quantity}</Text>
          <Text>
            <InputGroup
              size="sm"
              colorScheme={"orange"}
              borderColor="orange.500"
            >
              <InputLeftAddon
                cursor="pointer"
                children="-"
                onClick={() => prepareData("sub")}
              />
              <Input
                type={"number"}
                defaultValue={item.quantity}
                value={item.quantity}
                w={10}
              />
              <InputRightAddon
                cursor="pointer"
                children="+"
                onClick={() => prepareData("add")}
              />
            </InputGroup>
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartItem;
