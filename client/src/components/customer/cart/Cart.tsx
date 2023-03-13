import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { OrderInfo } from "../orders/OrderItem";
import CartItem from "./CartItem";

const Cart = () => {





  return (
    <div>
      <Drawer
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Flex>
              <Text>
              
              </Text>
              <Flex
              ><Text fontSize={"lg"} textColor="white">
              Balance
            </Text>
            <Text fontSize={"4xl"} fontWeight="semibold" textColor="white">
              $200
            </Text>
              </Flex>
              <Divider  />

                return (
                  <CartItem
                  />
                );
        

              <Divider />
              <Flex></Flex>
                <HStack >
                  <Text >
                  </Text>
                  <Text ></Text>
                </HStack>
                <HStack >
                  <Text >
                  </Text>
                  <Text></Text>
                </HStack>
                <HStack>
                  <Text></Text>
                  <Text>
                  </Text>
                </HStack>
                <Button
                >
                </Button>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Cart;