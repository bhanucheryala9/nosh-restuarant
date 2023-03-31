import React from "react";

function DesktopHeader() {
  return (
    <Stack direction={"row"} spacing={4} mt={1}>
      {(JSON.parse(localStorage.getItem("userInfo") as string)?.type ===
      "customer"
        ? CLIENT_NAV_ITEMS
        : JSON.parse(localStorage.getItem("userInfo") as string)?.type ===
          "admin"
        ? ADMIN_NAV_ITEMS
        : JSON.parse(localStorage.getItem("userInfo") as string)?.type ===
          "employee"
        ? EMPLOYEE_NAV
        : TOUR_NAV_ITEMS
      ).map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link to={navItem.href ?? "#"}>
                <CLink
                  p={2}
                  // href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  <Text fontWeight="semibold" fontSize="md" mr="6">
                    {navItem.label}
                  </Text>
                </CLink>
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
}

export default DesktopHeader;
