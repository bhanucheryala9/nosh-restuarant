import React from 'react'

function Dashboard copy() {
  return (
     <Flex direction={"column"}>
      {!isLoading && <Loader />}
      <Flex style={{ background: "rgba(0, 0, 0, 0.5)" }} position="relative">
        <Box filter="auto" brightness="35%" overflow={"hidden"}>
          <img
            src={welcome}
            alt="welcome screen"
            style={{
              minWidth: "100%",
              animation: "zoom-in-zoom-out 12s ease infinite",
              overflow: "hidden",
            }}
          />
        </Box>
        <Box
          position="absolute"
          top={{ lg: "20%", base: "20%" }}
          left={{ lg: "30%", base: "5%" }}
        >
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
            color="white"
            zIndex={1000}
            fontWeight="semibold"
            textShadow="0 2px px black"
            fontFamily="'Permanent Marker', cursive"
          >
            {" "}
            Welcome to our
          </Text>
          <Text
            fontSize={{ base: "4xl", md: "4xl", lg: "9xl" }}
            textColor="red.500"
            fontWeight={"bold"}
            textShadow="0 2px 10px black"
            fontFamily="'Permanent Marker', cursive"
          >
            Nosh{" "}
          </Text>
        </Box>
      </Flex>
      <Flex px="6" py="6" bg="white" alignItems="center" direction={"column"}>
        <Text
          fontFamily={"'Nunito', sans-serif"}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={"semibold"}
        >
          Indian Cuisines
        </Text>
        <Text
          fontFamily={"'Nunito', sans-serif"}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          Incredibly Tasty Indian Dish
        </Text>
        <Grid
          my={{ base: "6", lg: "4" }}
          templateRows={{ base: "repeat(5, 1fr)", lg: "repeat(1, 1fr)" }}
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }}
          gap={4}
        >
          <GridItem
            colSpan={2}
            rowSpan={{ base: 2, lg: 1 }}
            display="flex"
            alignItems={{ base: "start", lg: "center" }}
            justifyContent={{ base: "center", lg: "end" }}
          >
            <Flex
              direction={"column"}
              alignItems="end"
              justifyContent={"center"}
            >
              <Box maxW={{ base: "full", lg: "md" }}>
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Chole Bhature
                </Text>
                <Text fontSize={"md"}>
                  A popular North Indian dish, consisting of spicy chickpea
                  curry (chole) and deep-fried bread (bhature). It is usually
                  served with onion, pickle, and a side of yogurt.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Hyderabad Biryani
                </Text>
                <Text fontSize={"md"}>
                  A fragrant and flavorful rice dish made with spices, herbs,
                  and meat or vegetables. It is usually served with raita, a
                  yogurt-based side dish.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Pav Bjaji
                </Text>
                <Text fontSize={"md"}>
                  A popular street food from Mumbai, consisting of a spicy
                  vegetable curry (bhaji) served with buttered bread (pav). It
                  is often garnished with chopped onions, cilantro, and a
                  squeeze of lime juice.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Rogan Josh
                </Text>
                <Text fontSize={"md"}>
                  A Kashmiri dish made with tender lamb cooked in a rich and
                  flavorful tomato-based gravy, with a blend of spices. It is
                  usually served with rice or naan bread.
                </Text>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 1 }} rowSpan={{ base: 1, lg: 1 }}>
            <Flex justifyContent={{ base: "center" }}>
              <Image src={section2} h={{ base: "64", lg: "full" }} w={"lg"} />
            </Flex>
          </GridItem>
          <GridItem
            colSpan={2}
            rowSpan={{ base: 2, lg: 1 }}
            display="flex"
            alignItems={"center"}
          >
            <Flex
              direction={"column"}
              alignItems="start"
              justifyContent={"center"}
            >
              <Box maxW={"md"}>
                <Text
                  textColor={"orange.600"}
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                >
                  Vegetable Pakoras
                </Text>
                <Text fontSize={"md"}>
                  Deep-fried fritters made with a mixture of vegetables, gram
                  flour, and spices. They are crispy on the outside and soft on
                  the inside, and are usually served with mint chutney or
                  tamarind chutney.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Dahi Bhalla
                </Text>
                <Text fontSize={"md"}>
                  Soft and fluffy lentil dumplings soaked in sweetened yogurt
                  and topped with tamarind chutney, green chutney, and spices.
                  It is a perfect blend of sweet and tangy flavors.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Samosas
                </Text>
                <Text fontSize={"md"}>
                  Triangular-shaped pastries filled with spiced potatoes, peas,
                  or meat. They are usually deep-fried and served with chutney
                  or ketchup.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Chilli Chicken
                </Text>
                <Text fontSize={"md"}>
                  A Chinese-inspired dish made with crispy fried chicken tossed
                  in a spicy and tangy sauce. It is usually served with onion
                  rings and lemon wedges.
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
  )
}

export default Dashboard copy
