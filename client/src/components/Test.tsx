import { Button, Code, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import React, { createRef } from "react";
import Dropzone from "react-dropzone";
import { FaInbox } from "react-icons/fa";

const Test = () => {
  const dropzoneRef = createRef();
  const formData = new FormData();
  const handleFilesDropped = (files:File[]) =>{
    console.log("files list on drop", files);
    formData.append("file", files[0]);
    formData.append("upload_preset","iu8dkp2y")
    formData.append("folder","nosh")
    axios.post("https://api.cloudinary.com/v1_1/dh4anygjz/image/upload", formData).then((res)=>{
        console.log("success");
    }).catch((error)=>{
        console.log("failed to upload in cloudnary")
    })
  }
  const onSubmitClicked = () => {
    axios.post("https://api.cloudinary.com/v1_1/dh4anygjz/image/upload", formData).then((res)=>{
        console.log("success");
    }).catch((error)=>{
        console.log("failed to upload in cloudnary")
    })
  };
  return (
    <React.Fragment>
      <form>
        <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
              Add Inventory
            </Text>
            <Button
              colorScheme={"orange"}
              size={{ base: "sm", lg: "md" }}
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
                <Dropzone ref={dropzoneRef as any} onDrop={(files) => handleFilesDropped(files)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  )}
                </Dropzone>
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
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </form>
    </React.Fragment>
  );
};

export default Test;
