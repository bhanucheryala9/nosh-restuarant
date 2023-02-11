
export interface OrderInfo {
  id: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  url: string;
}

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
        >
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderItem;