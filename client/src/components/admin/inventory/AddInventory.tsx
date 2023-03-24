import React, { ReactNode, useEffect, useState } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Code,
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
import {
  generateUID,
  InventoryRequestPayload,
  NotificationStatus,
} from "../../common/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNotification } from "../../../contexts/Notification";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../contexts/AppStoreContext";
import Dropzone from "react-dropzone";

interface AddInventoryProps {
  children?: ReactNode;
  isUpdate?: boolean;
  setIsUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddInventory = (props: AddInventoryProps) => {
  const [formData, setFormData] = useState<InventoryRequestPayload>();
  const [defaultValues, setDefaultValues] = useState({});
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [productURI, setProductURI] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setShowNotification } = useNotification();
  const { AppStoreData } = useAppStore();

  useEffect(() => {
    setDefaultValues(AppStoreData?.inventoryData?.inventoryUpdateData);
    setForUpdate(AppStoreData?.inventoryData?.forUpdate);
  }, []);

  const prepareData = () => {
    const formattedData = {
      id: (defaultValues as any).id,
      productName: (defaultValues as any).productName,
      category: (defaultValues as any).category,
      description: (defaultValues as any).description,
      price: (defaultValues as any).price,
      discount: (defaultValues as any).discount,
      isAvailable: (defaultValues as any).isAvailable,
      tax: (defaultValues as any).tax,
    };
    return formattedData;
  };

  const handleFilesDropped = async (files: any) => {
    const formData1 = new FormData();
    formData1.append("file", files[0]);
    formData1.append("upload_preset", "iu8dkp2y");
    formData1.append("folder", "nosh");
    await axios
      .post("https://api.cloudinary.com/v1_1/dh4anygjz/image/upload", formData1)
      .then((res) => {
        setProductURI(res.data.url);
      })
      .catch((error) => {
        console.log("failed to upload in cloudnary");
        window.alert("Failed to upload image in cloud..!");
      });
  };
  const onSubmitClicked = () => {
    if (!forUpdate) {
      const preparedPayload = {
        ...formData,
        id: "I" + generateUID(),
        tax: 0,
        url: productURI,
      };
      axios
        .post(
          "http://34.235.166.147:5000/api/admin/v1/add-item",
          preparedPayload
        )
        .then((response) => {
          setShowNotification({
            status: NotificationStatus.SUCCESS,
            alertMessage: "Successfully Item added to inventory..!",
            showAlert: true,
          });
          navigate("/inventory");
        })
        .catch((error) => {
          setShowNotification({
            status: NotificationStatus.SUCCESS,
            alertMessage: "Failed to added Item to inventory..!",
            showAlert: true,
          });
        });
    } else {
      const data = prepareData();
      const payload = { ...data, ...formData };
      axios
        .put("http://34.235.166.147:5000/api/admin/v1/update-item", payload)
        .then((response) => {
          setShowNotification({
            status: NotificationStatus.SUCCESS,
            alertMessage: "Successfully Item added to inventory..!",
            showAlert: true,
          });
          navigate("/inventory");
        })
        .catch((error) => {
          setShowNotification({
            status: NotificationStatus.SUCCESS,
            alertMessage: "Failed to added Item to inventory..!",
            showAlert: true,
          });
        });
    }
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
                      defaultValue={(defaultValues as any)?.productName}
                      onChange={(e) => {
                        const data = {
                          ...formData,
                          productName: e.target.value,
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
                        defaultValue={(defaultValues as any)?.price}
                        {...register("price", {
                          required: "Price is required",
                        })}
                        onChange={(e) => {
                          const data = {
                            ...formData,
                            price: Number(e.target.value),
                          };
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
                      defaultValue={(defaultValues as any)?.discount}
                      {...register("discount", {
                        required: "Discount is required",
                      })}
                      onChange={(e) => {
                        const data = { ...formData, discount: e.target.value };
                        setFormData(data as any);
                      }}
                    />
                  

                <Flex direction="column" p="4" width={"100%"}>
                  <FormControl mt="4" isInvalid={!!errors["category"]}>
                    <FormLabel fontSize={"xs"}>Product Category</FormLabel>
                    <Select
                      placeholder="Select option"
                      defaultValue={(defaultValues as any)?.category}
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
