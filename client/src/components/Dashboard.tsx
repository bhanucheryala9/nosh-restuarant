import React from "react";

function Dashboard() {

   const handleCart = (data: any, operation: string, categ: string) => {
     const updatedData = presentdata?.map((item: any) => {
       if (operation === "add") {
         if (item.productName === data.productName) {
           return {
             ...item,
             quantity: item.quantity + 1,
           };
         } else {
           return item;
         }
       } else {
         if (item.productName === data.productName) {
           return {
             ...item,
             quantity: item.quantity - 1,
           };
         } else {
           return item;
         }
       }
     });

     setPresentation(updatedData as any);
     (dashboardCart as any)[categ] = updatedData;
     createCart(dashboardCart);
   };


  useEffect(() => {
    if (selectedCat === 0) {
      setPresentation((dashboardCart as any)?.budget);
    } else if (selectedCat === 1) {
      setPresentation((dashboardCart as any)?.favorite);
    } else if (selectedCat === 2) {
      setPresentation((dashboardCart as any)?.ready);
    } else {
      setPresentation((dashboardCart as any)?.trending);
    }
  }, [dashboardCart, selectedCat]);

  const getCategoriesItem = (index: number) => {
    return (
      <Flex
        bg={selectedCat === index ? "orange.400" : "gray.100"}
        my="2"
        py="2"
        px="4"
        borderRadius="xl"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setSelectedCat(index)}
      >
        <Flex direction="row" alignItems="center">
          {/* <IconButton
            colorScheme="orange"
            aria-label="Call Segun"
            size="lg"
            icon={<PhoneIcon />}
          /> */}
          <Flex alignItems="start" direction="column" py="2" mx="3">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              textColor={selectedCat === index ? "white" : "black"}
            >
              {catergoryLabels[index].label}
            </Text>
            {/* <Text
              fontSize="md"
              textColor={selectedCat === index ? "white" : "gray.600"}
            >
              {catergoryLabels[index].count} foods
            </Text> */}
          </Flex>
        </Flex>
        <Icon
          as={ArrowRightIcon}
          boxSize={3}
          mr="4"
          textColor={selectedCat === index ? "white" : "black"}
        />
      </Flex>
    );
  };

  const getOrderItem = (item: any) => {
    return (
      <Flex>
        <Flex
          bg={"gray.100"}
          borderRadius={"2xl"}
          direction={"column"}
          maxW={"250px"}
        >
          <Image
            src={item.url}
            width={"250px"}
            height={"150px"}
            borderRadius={"xl"}
          />
          <Flex mt="1" mb="2" mx="4" direction={"column"}>
            <Text fontSize={"lg"} fontWeight={"semibold"} my="2">
              {_.capitalize(item.productName)}
            </Text>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                ${item.price}
              </Text>
              {item.quantity === 0 ? (
                <Button
                  colorScheme="orange"
                  rounded={"full"}
                  borderRadius={"full"}
                  size={"sm"}
                  onClick={() =>
                    handleCart(item, "add", getCategoryIndexMapper(selectedCat))
                  }
                >
                  order
                </Button>
              ) : (
                <HStack>
                  <Button
                    colorScheme="orange"
                    rounded={"full"}
                    size={"sm"}
                    onClick={() =>
                      handleCart(
                        item,
                        "minus",
                        getCategoryIndexMapper(selectedCat)
                      )
                    }
                  >
                    -
                  </Button>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    {item.quantity}
                  </Text>
                  <Button
                    colorScheme="orange"
                    rounded={"full"}
                    size={"sm"}
                    onClick={() =>
                      handleCart(
                        item,
                        "add",
                        getCategoryIndexMapper(selectedCat)
                      )
                    }
                  >
                    +
                  </Button>
                </HStack>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const getTrendingItem = (item: any) => {
    return (
      <>
        <Flex
          my="2"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack alignItems="start">
            <Text fontSize="xl" fontWeight="semibold">
              {item?.productName}
            </Text>
            <Text textColor="orange.500" fontWeight="semibold">
              ${item?.price}
            </Text>
          </VStack>
          <Image src={item?.url} width="80px" height="80px" borderRadius="xl" />
        </Flex>
        <Divider />
      </>
    );
  };

  return (
    <Flex direction={"column"}>
      {!isLoading && <Loader />}
      <Flex direction="column">
        <Flex mx="10" mt="6">
          <Image src={banner} w="73%" h="60" borderRadius="2xl" />
          <Image src={banner2} w="25%" h="60" borderRadius="2xl" ml="10" />
        </Flex>
        <HStack gap={4} mx="10" my="10" alignItems="start">
          <Flex
            w="20%"
            bg="white"
            borderRadius="2xl"
            px="6"
            py="4"
            shadow="base"
            direction="column"
          >
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              <Text textColor="black" fontWeight="semibold" fontSize="2xl">
                Categories
              </Text>
            </Flex>
            <Flex direction="column" mt="4">
              {[1, 2, 3, 4]?.map((item, index) => {
                return getCategoriesItem(index);
              })}
            </Flex>
          </Flex>
          <Flex
            w="60%"
            bg="white"
            borderRadius="2xl"
            py="4"
            px="6"
            direction="column"
            shadow="base"
          >
            <Text textColor="black" fontWeight="semibold" fontSize="2xl">
              Orders
            </Text>
            <Grid
              mt="4"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
              width={"100%"}
              mb="6"
            >
              {presentdata?.map((item) => {
                return <GridItem>{getOrderItem(item)}</GridItem>;
              })}
            </Grid>
          </Flex>
          <Flex
            w="20%"
            bg="white"
            borderRadius="xl"
            py="4"
            px="6"
            shadow="base"
            direction="column"
          >
            <Text textColor="black" fontWeight="semibold" fontSize="2xl">
              Recommended Items
            </Text>

            <Flex direction="column" mt="4">
              {(dashboardCart as any)?.trending
                ?.slice(0, 5)
                ?.map((item: any) => {
                  return getTrendingItem(item);
                })}
            </Flex>
            {/* <Text mt="2" textColor="orange.500" fontWeight="semibold" ml="24">
              View More +
            </Text> */}
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
}
export default Dashboard;