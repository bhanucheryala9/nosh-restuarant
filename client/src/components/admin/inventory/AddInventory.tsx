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
    <div>
      <h2>Inventory Management</h2>
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
        </Flex>
      </form>

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

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddItem}>
        <h3>Add Item</h3>
        <label>
          Item:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default InventoryPage;
