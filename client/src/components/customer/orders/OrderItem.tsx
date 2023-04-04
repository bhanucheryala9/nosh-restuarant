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
import CornerRibbon from "react-corner-ribbon";

interface OrderItemsProps {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  isAvailable: boolean;
  tax: number;
  url: string;
  category: string;
  createdAt: string | Date;
}

export interface OrderInfo {
  id: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
}
const OrderItem = (props: OrderItemsProps) => {
  const {
    id,
    productName,
    description,
    category,
    price,
    discount,
    isAvailable,
    tax,
    url,
  } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(
          `../../../assets/orders/${"chickenpakora.jpg"}`
        ); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);
  const { cartData, setCartData } = useCart();
  const onItemClicked = () => {
    const filterData =
      cartData.length > 0
        ? cartData.findIndex(
            (item: any) => item.productName === productName
          ) !== -1
          ? cartData.map((item: any) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [
              ...cartData,
              {
                id: id,
                productName: productName,
                category: category,
                price: price,
                quantity: 1,
              },
            ]
        : [
            {
              id: id,
              productName: productName,
              category: category,
              price: price,
              quantity: 1,
            },
          ];
    console.log("********* data clicked for cart", filterData);
    setCartData(filterData);
  };
  return (
    <Card maxW={{ base: "full", lg: "sm" }} key={id}>
      {!isAvailable && (
        <CornerRibbon
          position="top-right" // OPTIONAL, default as "top-right"
          fontColor="#fff" // OPTIONAL, default as "#f0f0f0"
          backgroundColor="#FF0000" // OPTIONAL, default as "#2c7"
          containerStyle={{}} // OPTIONAL, style of the ribbon
          style={{}} // OPTIONAL, style of ribbon content
          className="" // OPTIONAL, css class of ribbon
        >
          NOT AVAILABLE
        </CornerRibbon>
      )}
      <CardBody>
        <Image
          filter="auto"
          brightness="70%"
          maxHeight={"56"}
          minW={{ base: "full", lg: "xs" }}
          src={url}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{productName}</Heading>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems={"center"}>
        <Text fontSize={"lg"} fontWeight="semibold">
          ${price}
        </Text>
        <Button
          variant={"solid"}
          colorScheme={isAvailable ? "orange" : "gray"}
          disabled={!isAvailable}
          rounded={"full"}
          onClick={onItemClicked}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;
