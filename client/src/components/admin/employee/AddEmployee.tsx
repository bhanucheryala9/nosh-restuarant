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
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotification } from "../../../contexts/Notification";
import { EmployeeRequestPayload, NotificationStatus } from "../../common/utils";

interface AddEmployeeProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children?: ReactNode;
}
const AddEmployee = (props: AddEmployeeProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const { signUp } = useAuth();
  const { setShowNotification } = useNotification();

  const [formData, setFormData] = useState<EmployeeRequestPayload>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmitClicked = (data: any) => {
    let formattedData = formData;
    formattedData = {
      ...formattedData,
      id:
        formattedData &&
        formattedData?.firstName[0] +
          formattedData?.lastName[0] +
          Math.floor(Math.random() * 90000) +
          10000,
      joinedDate: Date.now(),
      address: {
        ...formattedData?.address,
        zipcode: "12208",
      },
    } as any;

    axios
      .post("http://localhost:5000/api/admin/add-employee", formattedData)
      .then((response) => {

        try {
          signUp(formattedData?.email, "Nosh@123")
            .then((res: any) => {
              setShowNotification({
                status: NotificationStatus.SUCCESS,
                alertMessage: "User successfully logged in..!",
                showAlert: true,
              });
            })
            .catch((error: any) => {
              setShowNotification({
                status: NotificationStatus.ERROR,
                alertMessage: "Failed to create employee login..!",
                showAlert: true,
              });
            });
        } catch {
          setShowNotification({
            status: NotificationStatus.ERROR,
            alertMessage: "Failed to create employee login..!",
            showAlert: true,
          });
        }


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
        <form onSubmit={handleSubmit(onSubmitClicked)}>
          <ModalContent>
            <ModalHeader textColor={"orange.500"}>Add New Employee</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody p={8}>
              <Grid
                templateRows="repeat(6, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["firstName"]}>
                    <FormLabel
                      id="firstName"
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      First Name:
                    </FormLabel>
                    <Input
                      type={"text"}
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          firstName: e.target.value,
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["firstName"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["lastName"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Last Name:
                    </FormLabel>
                    <Input
                      type={"text"}
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          lastName: e.target.value,
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["lastName"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl isInvalid={!!errors["email"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Email:
                    </FormLabel>
                    <Input
                      type={"email"}
                      {...register("email", {
                        required: "Email is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          email: e.target.value,
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["email"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl isInvalid={!!errors["phone"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Mobile Number:
                    </FormLabel>
                    <Input
                      type={"number"}
                      {...register("phone", {
                        required: "Mobile Number is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          phoneNumber: e.target.value,
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["phone"]?.message as string}
                    </FormErrorMessage>
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
                    <Select
                      placeholder="Select option"
                      {...register("employeeType", {
                        required: "Employee is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          type: "employee",
                          subtype: e.target.value,
                        };
                        setFormData(userData as any);
                      }}
                    >
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
                  <FormControl isInvalid={!!errors["salary"]}>
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
                      <Input
                        placeholder="Enter amount"
                        {...register("salary", {
                          required: "Salary is required",
                        })}
                        onChange={(e) => {
                          const userData = {
                            ...formData,
                            salary: e.target.value,
                          };
                          setFormData(userData as any);
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors["salary"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={2}>
                  <FormControl isInvalid={!!errors["addressLine1"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      Address Line 1:
                    </FormLabel>
                    <Input
                      {...register("addressLine1", {
                        required: "Address Line1 is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          address: {
                            ...formData?.address,
                            addressLine1: e.target.value,
                          },
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["addressLine1"]?.message as string}
                    </FormErrorMessage>
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
                    <Input
                      {...register("addressLine2")}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          address: {
                            ...formData?.address,
                            addressLine2: e.target.value,
                          },
                        };
                        setFormData(userData as any);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["city"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      City:
                    </FormLabel>
                    <Input
                      {...register("city", {
                        required: "City is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          address: {
                            ...formData?.address,
                            city: e.target.value,
                          },
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["city"]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <FormControl isInvalid={!!errors["state"]}>
                    <FormLabel
                      fontSize={"xs"}
                      textColor="gray.600"
                      fontWeight={"semibold"}
                    >
                      State:
                    </FormLabel>
                    <Input
                      {...register("state", {
                        required: "State is required",
                      })}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          address: {
                            ...formData?.address,
                            state: e.target.value,
                          },
                        };
                        setFormData(userData as any);
                      }}
                    />
                    <FormErrorMessage>
                      {errors["state"]?.message as string}
                    </FormErrorMessage>
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
                    <Textarea
                      placeholder="write short discription about you.."
                      {...register("about")}
                      onChange={(e) => {
                        const userData = {
                          ...formData,
                          about: e.target.value,
                        };
                        setFormData(userData as any);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <FormControl>
                <HStack float={"right"}>
                  <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button colorScheme="orange" mr={3} type="submit">
                    Save Employee Details
                  </Button>
                </HStack>
              </FormControl>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default AddEmployee;
