
import React, { useEffect, useState } from "react";

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
  url: string;
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
  // const { cartData, setCartData } = useCart();

  };
  return (
    <Card maxW={"72"} key={id}>
      {!isAvailable && (
        <CornerRibbon
        >
          NOT AVAILABLE
        </CornerRibbon>
      )}
      <CardBody>
        <Image
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
          onClick={onItemClicked}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;