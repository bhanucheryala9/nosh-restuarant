import React from "react";

function Tracking() {
  returnreturn(
    <React.Fragment>
      <Flex w="100%" justifyContent="center" alignItems="center">
        <Flex
          bg="white"
          rounded={"2xl"}
          my="4"
          mx="6"
          px="10"
          py="6"
          maxW="60%"
          direction="column"
          alignItems="center"
          shadow="md"
        >
          <Text textColor="orange.500" fontSize="2xl" fontWeight="semibold">
            Check Your Status
          </Text>
          <Divider />
          <HStack justifyContent="space-between" w="100%">
            <Text>
              Name:{" "}
              {(trackorder as any)?.firstName +
                " " +
                (trackorder as any)?.lastName}
            </Text>
            <Text> ORDER ID: #{(trackorder as any)?.orderId}</Text>
          </HStack>
          <Flex mt="16" width="100%">
            {stepDetails !== -1 ? (
              <Steps
                style={{ width: "100%" }}
                progressDot
                current={stepDetails}
                direction="horizontal"
                items={statusProps}
              />
            ) : (
              <Flex w="550px" direction="column" alignItems="center" mt="3">
                <ImCancelCircle fontSize="40px" color="red" />
                <Text
                  mt="6"
                  fontSize="lg"
                  textColor="red.500"
                  fontWeight="semibold"
                >
                  {" "}
                  Order Cancelled
                </Text>
                <Text>Please contact restaurant...! </Text>
              </Flex>
            )}
          </Flex>
          <Button colorScheme="orange" mt="10" mb="6" onClick={onDaskClicked}>
            Back to Home Page
          </Button>
        </Flex>
      </Flex>
    </React.Fragment>
  );
}

export default Tracking;