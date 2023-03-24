import React from "react";
import { connect } from "react-redux";

export const OrderItem = (props) => {
  return (
    <Card maxW={"72"} key={id}>
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
          maxW={"100%"}
          minW="100%"
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
