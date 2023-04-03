
import React, { createRef, useCallback, useEffect, useState } from "react";
const Tracking = () => {


  const statusProps = [
    {
      title: (
        <Flex alignItems="center">
          <Image src={orderPlaced} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold" fontSize="md">
            {" "}
            Order Placed
          </Text>
        </Flex>
      ),
    },
    {
      title: (
        <Flex alignItems="center">
          <Image src={accepted} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold">
            {" "}
            Order Accepted
          </Text>
        </Flex>
      ),
    },
    {
      title: (
        <Flex alignItems="center">
          <Image src={preparing} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold">
            {" "}
            Preparing
          </Text>
        </Flex>
      ),
    },
    {
      title: (
        <Flex alignItems="center">
          <Image src={ready} h="50px" w="50px" />{" "}
          <Text ml="2" fontWeight="semibold">
            {" "}
            Ready
          </Text>
        </Flex>
      ),
    },
  ];


  }

  return (
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
   
      </Flex>
    </Flex>
  </React.Fragment>
  );
};

export default Tracking;