
} from "@chakra-ui/react";
import React, { useState } from "react";
import { OrderInfo } from "../orders/OrderItem";

interface CartItemProps {
  item: OrderInfo;
  setCartInfo: React.Dispatch<React.SetStateAction<OrderInfo[]>>;
  cartInfo: OrderInfo[];
}

const CartItem = (props: CartItemProps) => {

  };

  return (
    <Flex>
      <Flex>
        <Image
        />
      </Flex>
      <Flex>
        <HStack>
          <Text >

          </Text>
          <Text>
        
          </Text>
        </HStack>
        <HStack >
          <Text ></Text>
          <Text>
            <InputGroup
            >
              <InputLeftAddon
              />
              <Input />
              <InputRightAddon
              />
            </InputGroup>
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartItem;