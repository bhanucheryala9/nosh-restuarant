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
    Textarea,
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { ReactNode, useState } from "react";
  import { useForm } from "react-hook-form";
  import { useAuth } from "../../../contexts/AuthContext";
  import { useNotification } from "../../../contexts/Notification";
  import { EmployeeRequestPayload, NotificationStatus } from "../../common/utils";
  
  interface AddEmployeeProps {2
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    children?: ReactNode;
    defaultData?: any;
    isUpdate: boolean;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  }

  const AddEmployee=(props: AddEmployeeProps)=>{
    
    return(
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
              ></Grid>
              </ModalBody>
              <Divider />
                <ModalFooter>
                    </ModalContent>
                    </form>
                    </Modal>
                    </React.Fragment>


    );
  };
  export default AddEmployee;