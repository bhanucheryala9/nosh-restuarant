import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface AddEmployeeProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children?: ReactNode;
}
const AddEmployee = (props: AddEmployeeProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  return (
    <React.Fragment>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textColor={"orange.500"}>Add New Employee</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody p={8}>
            <form>
              <Grid
                templateRows="repeat(6, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      First Name:
                    </FormLabel>
                    <Input type="firstName" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Last Name:
                    </FormLabel>
                    <Input type="lastName" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Email:
                    </FormLabel>
                    <Input type="email" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Mobile Number:
                    </FormLabel>
                    <Input type="phone" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Employee Type:
                    </FormLabel>
                    <Select placeholder="Select option">
                      <option value="manager" style={{ padding: "0 10px" }}>
                        Manager
                      </option>
                      <option value="employee" style={{ padding: "0 10px" }}>
                        Employee
                      </option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Salary:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="$"
                      />
                      <Input placeholder="Enter amount" />
                    </InputGroup>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Address Line 1:
                    </FormLabel>
                    <Input type="addressLine1" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Address Line 2:
                    </FormLabel>
                    <Input type="addressLine2" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      City:
                    </FormLabel>
                    <Input type="city" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      State:
                    </FormLabel>
                    <Input type="state" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      About You:
                    </FormLabel>
                    <Textarea placeholder="write short discription about you.." />
                  </FormControl>
                </GridItem>
              </Grid>
            </form>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <HStack>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button colorScheme="orange" mr={3}>
                Save Employee Details
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default AddEmployee;
