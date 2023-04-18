import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Avatar,
  AvatarBadge,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../../assets/app-logo.jpg";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileNav";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { faker } from "@faker-js/faker";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { setIsCartOpen } = useCart();
  const [userType, setUserType] = useState<string>("");
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    logOut()
      .then(() => {
        console.log(" logout successfully");
        navigate("/");
      })
      .catch(() => {});
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo") as string);
    setUserType(userData.type);
  }, []);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 6 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            cursor="pointer"
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems="center"
        >
          <Flex alignContent={"center"}>
            <Img src={logo} h="12" />
            <Text
              fontSize={"4xl"}
              mx="2"
              fontWeight={"semibold"}
              textColor="orange.500"
              fontFamily={"'Sassy Frass', cursive"}
            >
              Nosh.
            </Text>
          </Flex>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopHeader />
          </Flex>
        </Flex>

        {localStorage.getItem("isUserLoggedIn") === "yes" && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            alignItems="center"
            spacing={6}
          >
            {JSON.parse(localStorage.getItem("userInfo") as string)?.type === "customer" && (
              <>
                <Icon
                  as={AiOutlineShoppingCart}
                  size="lg"
                  boxSize={"6"}
                  onClick={() => setIsCartOpen(true)}
                  cursor="pointer"
                />
                {/* <Avatar src="">
                <AvatarBadge boxSize="1.25em" bg="green.500" as={Text}>
                  3
                </AvatarBadge>
              </Avatar> */}
              </>
            )}
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size="sm" bg="gray.200" src={faker.image.avatar()}>
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"lg"} name="Bhanu Cheryala" bg="orange.50" />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileHeader />
      </Collapse>
    </Box>
  );
};
export default Header;
