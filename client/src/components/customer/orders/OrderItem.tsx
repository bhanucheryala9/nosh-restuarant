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
interface OrderItemsProps {
  ItemId: string;
  ItemName: string;
  ItemDescription: string;
  category: string;
  price: string;
  isVeg: boolean;
  isAvailable: boolean;
  Mappingkey: string;
}
const OrderItem = (props: OrderItemsProps) => {
  const { ItemName, ItemDescription, category, price, Mappingkey } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../../../assets/orders/${Mappingkey}`); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
        console.log("jehwghje")
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [Mappingkey]);
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          filter="auto"
          brightness="70%"
          maxHeight={"56"}
          minW="xs"
          src={image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{ItemName}</Heading>
          <Text>
            This is special chicken biryani which is made with multiple spicies.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems={"center"}>
        <Text fontSize={"lg"} fontWeight="semibold">
          {price}
        </Text>
        <Button variant={"solid"} colorScheme="orange" rounded={"full"}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;