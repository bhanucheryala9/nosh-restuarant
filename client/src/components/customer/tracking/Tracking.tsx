
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
      <Flex >
        <Flex>
          <Text >
            Check Your Status
          </Text>
          <Divider />
          <HStack >
            <Text>
            </Text>
            <Text> </Text>
          </HStack>
          <Flex>
          
          
          
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

export default Tracking;