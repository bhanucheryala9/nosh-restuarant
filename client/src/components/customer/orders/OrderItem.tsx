import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Biryani from "../../../assets/biryani.jpg";
import { useCart } from "../../../contexts/CartContext";
interface OrderItemsProps {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  isAvailable: boolean;
  tax: number;
  category: string;
  createdAt: string | Date;
}

export interface OrderInfo {
  itemID: string;
  itemName: string;
  category: string;
  price: number;
  quantity: number;
}
const OrderItem = (props: OrderItemsProps) => {
  const { id, productName, description, category, price, discount, isAvailable, tax,  } =
    props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [image, setImage] = useState();

  // console.log("*************** item id:", ItemId, ItemName)
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../../../assets/orders/${"chickenpakora.jpg"}`); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);
  const { cartData, setCartData } = useCart();
  // const onItemClicked = () => {
  //   const filterData =
  //     cartData.length > 0
  //       ? cartData.findIndex((item: any) => item.itemName === ItemName) !== -1
  //         ? cartData.map((item: any) =>
  //             item.itemID === ItemId
  //               ? { ...item, quantity: item.quantity + 1 }
  //               : item
  //           )
  //         : [
  //             ...cartData,
  //             {
  //               itemID: ItemId,
  //               itemName: ItemName,
  //               category: category,
  //               price: price,
  //               quantity: 1,
  //             },
  //           ]
  //       : [
  //           {
  //             itemID: ItemId,
  //             itemName: ItemName,
  //             category: category,
  //             price: price,
  //             quantity: 1,
  //           },
  //         ];

  //   console.log(" filterd data", filterData);
  //   setCartData(filterData);
  // };
  return (
    <Card maxW={{ base: "full", lg: "sm" }} key={id}>
      <CardBody>
        <Image
          filter="auto"
          brightness="70%"
          maxHeight={"56"}
          minW={{ base: "full", lg: "xs" }}
          src={image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{productName}</Heading>
          <Text>
            {description}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems={"center"}>
        <Text fontSize={"lg"} fontWeight="semibold">
          ${price}
        </Text>
        <Button
          variant={"solid"}
          colorScheme="orange"
          rounded={"full"}
          // onClick={onItemClicked}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;