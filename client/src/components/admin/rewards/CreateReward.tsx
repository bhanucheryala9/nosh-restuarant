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
import axios from "axios";
import React, { ReactNode, useState } from "react";
import { RewardsRequestPayload } from "../../common/utils";

interface CreateRewardProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children?: ReactNode;
}
const CreateReward = (props: CreateRewardProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [formData, setFormData] = useState<RewardsRequestPayload>();

  const onSubmitClicked = () => {
    const preparedPayload =  {...formData, id:"sjhagdjhsaddghj"}
    console.log("payload of inventory", preparedPayload )
    axios
    .post("http://localhost:5000/api/admin/add-reward", preparedPayload)
    .then((response) => {
    })
    .catch((error) => {
    });

  };
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
                    <Select
                      placeholder="Reward Type"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          rewardType: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    >
                      <option value="promo-code" style={{ padding: "0 10px" }}>
                        Promo Code
                      </option>
                      <option value="discount" style={{ padding: "0 10px" }}>
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
                    <Input
                      placeholder="lastName"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          rewardType: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    />
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
                    <Input
                      type="number"
                      placeholder="Enter discount"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          discountPercentage: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    />
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
                    <Input
                      type="number"
                      placeholder="Max Discount Amount"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          maxDiscountAmount: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    />
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
                      <Input
                        type="number"
                        placeholder="Min Order Price"
                        onChange={(e) => {
                          const data = {
                            ...formData,
                            minOrderPrice: e.target.value,
                          };
                          setFormData(data as any);
                        }}
                      />
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
                    <Select
                      placeholder="Reward Applies"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          appliesTo: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    >
                      <option value="all" style={{ padding: "0 10px" }}>
                        All
                      </option>
                      <option value="category" style={{ padding: "0 10px" }}>
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
                    <Select
                      placeholder="Select Category"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          appliedCategory: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    >
                      <option value="cat-1" style={{ padding: "0 10px" }}>
                        Category-1
                      </option>
                      <option value="cat-2" style={{ padding: "0 10px" }}>
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
              <Button colorScheme="orange" mr={3} onClick={onSubmitClicked}>
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
