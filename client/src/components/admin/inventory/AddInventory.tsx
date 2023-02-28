import React, { useState } from "react";
import {
  Card,
  Flex,
  Grid,
  GridItem,
  Text,
  Avatar,
  HStack,
  Link,
  Portal,
  Code,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import Dragger from "antd/es/upload/Dragger";
import { UploadProps } from "antd";
import { FaInbox } from "react-icons/fa";
import { InventoryRequestPayload, NotificationStatus } from "../../common/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNotification } from "../../../contexts/Notification";
import { useNavigate } from "react-router-dom";

const AddInventory = () => {
  const [formData, setFormData] = useState<InventoryRequestPayload>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setShowNotification } = useNotification();

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onSubmitClicked = () => {
    const preparedPayload = { ...formData, id: "sjhagdjhsaddghj" };
    console.log("payload of inventory", preparedPayload);
    axios
      .post("http://localhost:5000/api/admin/add-item", preparedPayload)
      .then((response) => {
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Successfully Item added to invetory..!",
          showAlert: true,
        });
        navigate("/inventory");

      })
      .catch((error) => {
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Failed to added Item to invetory..!",
          showAlert: true,
        });
      });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmitClicked)}>
        <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
              Add Inventory
            </Text>
            <Button
              colorScheme={"orange"}
              size={{ base: "sm", lg: "md" }}
              type="submit"
              // onClick={onSubmitClicked}
            >
              {" "}
              Add Product
            </Button>
          </Flex>

          <Grid
            my={4}
            templateRows={{ base: "repeat(8, 1fr)", lg: "repeat(2, 1fr)" }}
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(7, 1fr)" }}
            gap={4}
          >
            <GridItem colSpan={{ base: 1, lg: 4 }} rowSpan={{ base: 4, lg: 2 }}>
              <Flex
                bg="white"
                pt="4"
                pb="10"
                px="6"
                borderRadius={"md"}
                w="100%"
                direction={"column"}
              >
                <Code
                  bg="gray.50"
                  children="Genaral Information"
                  p="2"
                  width={"99%"}
                  mx="1"
                  my="4"
                />
                <form>
                  <FormControl mt="4" isInvalid={!!errors["productName"]}>
                    <FormLabel fontSize={"xs"}>Product Name</FormLabel>
                    <Input
                      placeholder="Enter product name"
                      {...register("productName", {
                        required: "Product Name is required",
                      })}
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          productName: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["productName"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Description</FormLabel>
                    <Textarea
                      placeholder="Enter product summary here.."
                      {...register("description")}
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          description: e.target.value,
                        };

                        setFormData(data as any);
                      }}
                    />
                  </FormControl>
                  <FormControl mt="4" isInvalid={!!errors["price"]}>
                    <FormLabel fontSize={"xs"}>Price</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="$"
                      />
                      <Input
                        placeholder="Enter amount"
                        type={"number"}
                        {...register("price", {
                          required: "Price is required",
                        })}
                        onChange={(e) => {
                          const data = { ...formData, price: e.target.value };
                          setFormData(data as any);
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors["price"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl mt="4" isInvalid={!!errors["discount"]}>
                    <FormLabel fontSize={"xs"}>Discount</FormLabel>
                    <Input
                      placeholder="Enter discount"
                      type="number"
                      {...register("discount", {
                        required: "Discount is required",
                      })}
                      onChange={(e) => {
                        const data = { ...formData, discount: e.target.value };
                        setFormData(data as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["discount"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl mt="4" isInvalid={!!errors["isAvailable"]}>
                    <FormLabel fontSize={"xs"}>Available</FormLabel>
                    <Select
                      placeholder="Change Availablity Status"
                      {...register("isAvailable", {
                        required: "Is available is required",
                      })}
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          isAvailable: e.target.value === "yes" ? true : false,
                        };
                        setFormData(data as any);
                      }}
                    >
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                    <FormErrorMessage>
                      {errors["isAvailable"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </form>
              </Flex>
            </GridItem>
            <GridItem
              colSpan={{ base: 1, lg: 3 }}
              rowSpan={{ base: 2, lg: 1 }}
              bg="white"
              borderRadius={"md"}
            >
              <Flex p="4" direction={"column"} alignItems="center">
                <Code
                  bg="gray.50"
                  children="PRODUCT IMAGES"
                  p="2"
                  width={"99%"}
                  mx="4"
                  my="4"
                />
                <Dragger {...props} style={{ width: "100%" }}>
                  <Flex alignItems={"center"} direction="column" py="4" px="8">
                    <p className="ant-upload-drag-icon">
                      <FaInbox width={40} height={40} />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </p>
                  </Flex>
                </Dragger>
              </Flex>
            </GridItem>
            <GridItem
              colSpan={{ base: 1, lg: 3 }}
              rowSpan={{ base: 2, lg: 1 }}
              bg="white"
              borderRadius={"md"}
            >
              <Flex p="4" direction={"column"} alignItems="center">
                <Code
                  bg="gray.50"
                  children="PRODUCT META INFO"
                  p="2"
                  width={"99%"}
                  mx="4"
                />

                <Flex direction="column" p="4" width={"100%"}>
                  <FormControl mt="4" isInvalid={!!errors["category"]}>
                    <FormLabel fontSize={"xs"}>Product Category</FormLabel>
                    <Select
                      placeholder="Select option"
                      {...register("category", {
                        required: "Category is required",
                      })}
                      onChange={(e) => {
                        const data = { ...formData, category: e.target.value };
                        setFormData(data as any);
                      }}
                    >
                      <option value="appetizers" style={{ padding: "0 10px" }}>
                        Appetizers
                      </option>
                      <option value="biryani" style={{ padding: "0 10px" }}>
                        Biryani
                      </option>
                      <option value="soups" style={{ padding: "0 10px" }}>
                        Soups
                      </option>
                      <option
                        value="indo-chinese"
                        style={{ padding: "0 10px" }}
                      >
                        Indo Chinese
                      </option>
                      <option value="main-course" style={{ padding: "0 10px" }}>
                        Main Course
                      </option>
                      <option value="beverages" style={{ padding: "0 10px" }}>
                        Beverages
                      </option>
                    </Select>
                    <FormErrorMessage>
                      {errors["category"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl mt="4" isInvalid={!!errors["tax"]}>
                    <FormLabel fontSize={"xs"}>Tax Percentage</FormLabel>
                    <Input
                      placeholder="Enter tax percentage"
                      type="number"
                      {...register("tax", {
                        required: "Tax is required",
                      })}
                      onChange={(e) => {
                        const data = { ...formData, tax: e.target.value };
                        setFormData(data as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["tax"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </form>
    </React.Fragment>
  );
};

export default AddInventory;
