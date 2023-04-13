import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EmployeeRequestPayload } from "./utils";
import axios from "axios";

const Profile = () => {
  const profile = JSON.parse(
    localStorage?.getItem("userInfo") || ("{}" as string)
  );

  const [usersData, setUserData] = useState<Partial<EmployeeRequestPayload>>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      firstName: usersData?.firstName,
      lastName: usersData?.lastName,
      email: usersData?.email,
      phone: usersData?.phoneNumber,
      employeeType: usersData?.subtype,
      salary: usersData?.salary,
      addressLine1: usersData?.address?.addressLine1,
      addressLine2: usersData?.address?.addressLine1,
      city: usersData?.address?.city,
      state: usersData?.address?.state,
      about: usersData?.about,
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/v1/getuserdetailsbyId", {
        params: {
          id: profile.email,
        },
      })
      .then((res) => {
        setUserData(res.data.users[0]);
      });
  }, []);

  const [formData, setFormData] = useState<EmployeeRequestPayload>();

  const onSubmitClicked = () => {
    const payload = { ...usersData, ...formData };

    axios
      .put("http://localhost:5000/api/admin/v1/update-employee", payload)
      .then((response) => {
        console.log("successfully updated user information..!");
      })
      .catch((error) => {
        console.log("failed to create");
      });
  };
  return (
    <Flex direction={"column"}>
      <Flex w={"100%"} height={"36"} bg="orange.400"></Flex>
      <form onSubmit={handleSubmit(onSubmitClicked)}>
        <Flex
          mx={"20"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Flex>
            <Avatar name="Bhanu Cheryala" size="xl" />
            <Flex direction={"column"} mx="4">
              <Text fontSize={"2xl"} fontWeight={"semibold"}>
                Profile
              </Text>
              <Text>Update your photo and personal details here.</Text>
            </Flex>
          </Flex>
          <Button colorScheme="orange" type="submit">
            Save Details
          </Button>
        </Flex>

        <Flex direction={"column"} mx="28">
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
              defaultValue={usersData?.firstName}
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
              defaultValue={usersData?.lastName}
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
              defaultValue={usersData?.email}
              isDisabled={true}
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
              defaultValue={usersData?.phoneNumber}
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
              defaultValue={usersData?.address?.addressLine1}
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
              defaultValue={usersData?.address?.addressLine2}
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
              defaultValue={usersData?.address?.city}
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
              defaultValue={usersData?.address?.state}
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
              // defaultValue={usersData?.about}
              onChange={(e) => {
                const userData = {
                  ...formData,
                  about: e.target.value,
                };
                setFormData(userData as any);
              }}
            />
          </FormControl>
        </Flex>
      </form>
    </Flex>
  );
};

export default Profile;
