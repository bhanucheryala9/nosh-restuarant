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
import { useCart } from "../../../contexts/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const {isCartOpen, setIsCartOpen} = useCart();
  return (
    <div>
      <Drawer
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _focus={{ outline:"none"}} />
          <DrawerHeader>{` Your Cart`}</DrawerHeader>
          <DrawerBody>
            <Flex
              border={"2px solid"}
              borderColor="orange.300"
              minWidth={"70%"}
              borderRadius={"md"}
              bg="orange.100"
              justifyContent={"center"}
              direction="column"
              px="6"
            >
              <Text mt="4" fontWeight={"semibold"}>
                Your Dashboard
              </Text>
              <Flex
                bg="linear-gradient(-60deg, #ff5858 0%, #f09819 100%)"
                px="6"
                py="6"
                maxH={"40"}
                minW="80"
                borderRadius={"xl"}
                direction="column"
                my="3"
              >
                <Text fontSize={"lg"} textColor="white">
                  Balance
                </Text>
                <Text fontSize={"4xl"} fontWeight="semibold" textColor="white">
                  $200
                </Text>
              </Flex>
              <Divider mb="4" />
              {[1, 2, 3, 4].map((item) => {
                return <CartItem />;
              })}

              <Divider my="6" />
              <Flex mb="6" direction={"column"} pr="3">
                <HStack justifyContent={"space-between"}>
                  <Text fontSize={"sm"} textColor="gray.700">
                    Tax
                  </Text>
                  <Text fontSize={"sm"}>$3</Text>
                </HStack>
                <HStack justifyContent={"space-between"} mt="2">
                  <Text>Total</Text>
                  <Text textColor={"orange.500"} fontWeight="semibold" fontSize={"2xl"}>$200</Text>
                </HStack>
                <Button colorScheme={"orange"} width="100%" mt="3">
                  Proceed to Pay
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