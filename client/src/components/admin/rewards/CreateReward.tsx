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

interface CreateRewardProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children?: ReactNode;
}
const CreateReward = (props: CreateRewardProps) => {
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
          <ModalHeader textColor={"orange.500"}>Add New Reward</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody p={8}>
            <form>
              <Grid
                templateRows="repeat(6, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Reward Type:
                    </FormLabel>
                    <Select placeholder="Reward Type">
                      <option value="manager" style={{ padding: "0 10px" }}>
                        Promo Code
                      </option>
                      <option value="employee" style={{ padding: "0 10px" }}>
                        Discount
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
                      Promo Code
                    </FormLabel>
                    <Input type="lastName" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Discount Percentage
                    </FormLabel>
                    <Input type="text" placeholder="Enter discount" />
                  </FormControl>
                </GridItem>

                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Max Discount Amount
                    </FormLabel>
                    <Input type="text" placeholder="Max Discount Amount" />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Min Order Price
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="$"
                      />
                      <Input type="text" placeholder="Min Order Price" />
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
                      Reward Applies To:
                    </FormLabel>
                    <Select placeholder="Reward Applies">
                      <option value="manager" style={{ padding: "0 10px" }}>
                        All
                      </option>
                      <option value="employee" style={{ padding: "0 10px" }}>
                        Category
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
                      Select Category:
                    </FormLabel>
                    <Select placeholder="Select Category">
                      <option value="manager" style={{ padding: "0 10px" }}>
                        Category-1
                      </option>
                      <option value="employee" style={{ padding: "0 10px" }}>
                        Category-2
                      </option>
                    </Select>
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
                Create Reward
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default CreateReward;
