import {
  Box,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { ADMIN_NAV_ITEMS, CLIENT_NAV_ITEMS, NAV_ITEMS } from "../common/utils";
import DesktopSubHeader from "./DesktopSubHeader";

const DesktopHeader = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");



  
  const [nav, setNav] = useState(NAV_ITEMS);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo") as string);
    const customerTypeNav =
      userData.type === "customer"
        ? CLIENT_NAV_ITEMS
        : userData.type === "admin"
        ? ADMIN_NAV_ITEMS
        : NAV_ITEMS;
    setNav(customerTypeNav);
  }, []);

  return (
    <Stack direction={"row"} spacing={4} mt={1}>
      {nav.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubHeader key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopHeader;
