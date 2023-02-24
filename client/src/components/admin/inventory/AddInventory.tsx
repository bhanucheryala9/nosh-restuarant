import React, { useState } from "react";
import Header from "../../header/Header";
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
} from "@chakra-ui/react";
import Dragger from "antd/es/upload/Dragger";
import { UploadProps } from "antd";
import { FaInbox } from "react-icons/fa";
import { InventoryRequestPayload } from "../../common/utils";
import axios from "axios";

const AddInventory = () => {
  const [formData, setFormData] = useState<InventoryRequestPayload>();
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
    const preparedPayload =  {...formData, id:"sjhagdjhsaddghj"}
    console.log("payload of inventory", preparedPayload )
    axios
    .post("http://localhost:5000/api/admin/add-item", preparedPayload)
    .then((response) => {
    })
    .catch((error) => {
    });

  };

  return (
    <React.Fragment>
      <form >
        <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
              Add Inventory
            </Text>
            <Button
              colorScheme={"orange"}
              size={{ base: "sm", lg: "lg" }}
              // type="submit"
              onClick={onSubmitClicked}
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
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Product Name</FormLabel>
                    <Input
                      placeholder="Enter product name"
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          productName: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    />
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Description</FormLabel>
                    <Textarea
                      placeholder="Enter product summary here.."
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          description: e.target.value,
                        };
                        setFormData(data as any);
                      }}
                    />
                  </FormControl>
                  <FormControl mt="4">
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
                        onChange={(e) => {
                          const data = { ...formData, price: e.target.value };
                          setFormData(data as any);
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Discount</FormLabel>
                    <Input
                      placeholder="Enter discount"
                      type="number"
                      onChange={(e) => {
                        const data = { ...formData, discount: e.target.value };
                        setFormData(data as any);
                      }}
                    />
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Available</FormLabel>
                    <Select
                      placeholder="Change Availablity Status"
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
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Product Category</FormLabel>
                    <Select
                      placeholder="Select option"
                      // {...register("employeeType", {
                      //   required: "Employee is required",
                      // })}
                      onChange={(e) => {
                        const data = { ...formData, category: e.target.value };
                        setFormData(data as any);
                      }}
                    >
                      <option value="main-course" style={{ padding: "0 10px" }}>
                        Main Course
                      </option>
                      <option value="staters" style={{ padding: "0 10px" }}>
                        Staters
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel fontSize={"xs"}>Tax Percentage</FormLabel>
                    <Input
                      placeholder="Enter tax percentage"
                      type="number"
                      onChange={(e) => {
                        const data = { ...formData, tax: e.target.value };
                        setFormData(data as any);
                      }}
                    />
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
