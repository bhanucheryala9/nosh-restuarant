import {
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
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
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { ReactNode, useState } from "react";
  import {
    generateUID,
    NotificationStatus,
    RewardsRequestPayload,
  } from "../../common/utils";
  import { useForm } from "react-hook-form";
  import { useNotification } from "../../../contexts/Notification";
  import "react-date-range/dist/styles.css"; // main css file
  import "react-date-range/dist/theme/default.css";
  import {  DateRange } from "react-date-range";
  interface CreateRewardProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    children?: ReactNode;
    defaultData?: any;
    forUpdate?: boolean;
    setForUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  }
  const CreateReward = (props: CreateRewardProps) => {
    const { isModalOpen, setIsModalOpen, defaultData, forUpdate, setForUpdate } =
      props;
    const [formData, setFormData] = useState<RewardsRequestPayload>();
    const [showField, setShowField] = useState<string>("all");
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();
    const { setShowNotification } = useNotification();
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  
  
    const prepareData = () => {
      const formattedData = {
        id: (defaultData as any).id,
        rewardType: (defaultData as any).rewardType,
        code: (defaultData as any).code,
        discountPercentage: (defaultData as any).discountPercentage,
        maxDiscountAmount: (defaultData as any).maxDiscountAmount,
        minOrderPrice: (defaultData as any).minOrderPrice,
        appliesTo: (defaultData as any).appliesTo,
        appliedCategory: (defaultData as any).appliedCategory,
      };
      return formattedData;
    };
  
    const onSubmitClicked = () => {
      if (!forUpdate) {
        const preparedPayload = { ...formData, id: "R" + generateUID() };
        axios
          .post("http://34.235.166.147:5000/api/admin/v1/add-reward", preparedPayload)
          .then((response) => {
            setIsModalOpen(false);
            setShowNotification({
              status: NotificationStatus.SUCCESS,
              alertMessage: "Reward created successfully..!",
              showAlert: true,
            });
          })
          .catch((error) => {
            setIsModalOpen(false);
            setShowNotification({
              status: NotificationStatus.SUCCESS,
              alertMessage: "Failed to create Reward..!",
              showAlert: true,
            });
          });
      } else {
        const data = prepareData();
        const preparedPayload = { ...data, ...formData };
        axios
          .put(
            "http://34.235.166.147:5000/api/admin/v1/update-reward",
            preparedPayload
          )
          .then((response) => {
            setForUpdate(false);
            setIsModalOpen(false);
            setShowNotification({
              status: NotificationStatus.SUCCESS,
              alertMessage: "Reward created successfully..!",
              showAlert: true,
            });
          })
          .catch((error) => {
            setIsModalOpen(false);
            setShowNotification({
              status: NotificationStatus.SUCCESS,
              alertMessage: "Failed to create Reward..!",
              showAlert: true,
            });
          });
      }
    };
    return (
      <React.Fragment>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="3xl"
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit(onSubmitClicked)}>
              <ModalHeader textColor={"orange.500"}>Add New Reward</ModalHeader>
              <ModalCloseButton />
              <Divider />
              <ModalBody p={8}>
                <Grid
                  templateRows={
                    showField === "category" ? "repeat(6, 1fr)" : "repeat(5, 1fr)"
                  }
                  templateColumns="repeat(2, 1fr)"
                  gap={4}
                >
                  <GridItem rowSpan={1} colSpan={2}>
                    <FormControl isInvalid={!!errors["rewardType"]}>
                      <FormLabel
                        fontSize={"xs"}
                        textColor="gray.600"
                        fontWeight={"semibold"}
                      >
                        Reward Type:
                      </FormLabel>
                      <Select
                        placeholder="Reward Type"
                        defaultValue={defaultData?.rewardType}
                        {...register("rewardType", {
                          required: "Reward type is required",
                        })}
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
                      <FormErrorMessage>
                        {errors["rewardType"]?.message as string}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={2}>
                    <FormControl isInvalid={!!errors["code"]}>
                      <FormLabel
                        fontSize={"xs"}
                        textColor="gray.600"
                        fontWeight={"semibold"}
                      >
                        Promo Code
                      </FormLabel>
                      <Input
                        placeholder="Promo Code"
                        defaultValue={defaultData?.code}
                        {...register("code", {
                          required: "Reward Code is required",
                        })}
                        onChange={(e) => {
                          const data = {
                            ...formData,
                            code: e.target.value,
                          };
                          setFormData(data as any);
                        }}
                      />
                      <FormErrorMessage>
                        {errors["code"]?.message as string}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <FormControl isInvalid={!!errors["discountPercentage"]}>
                      <FormLabel
                        fontSize={"xs"}
                        textColor="gray.600"
                        fontWeight={"semibold"}
                      >