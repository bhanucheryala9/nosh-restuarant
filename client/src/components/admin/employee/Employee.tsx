import React, { useEffect, useRef, useState } from "react";
import { Input, InputRef, Space, Table, Tag } from "antd";
import {
  Flex,
  Grid,
} from "@chakra-ui/react";
import AddEmployee from "./AddEmployee";
import { useNotification } from "../../../contexts/Notification";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

export interface EmployeeDatatype {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  employeeType: string;
  address: string;
  salary: string;
  joinedDate: string;
  about?: string;
}
const Employee = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addEmployeeModal, setAddEmployeeModal] = useState<boolean>(false);
  const [unformattedEmployeeData, setunformattedEmployeeData] = useState([]);
  const [employeeData, setEmployeeData] = useState<Array<EmployeeDatatype>>([]);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<EmployeeDatatype>(
    employeeData[0]
  );

  type DataIndex = keyof EmployeeDatatype;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  return (
    <React.Fragment>
      <Flex>
          Employees List
        </Text>
        <Grid>
          <GridItem colSpan={{ base: 1, lg: 4 }}>
            <Flex>
              <Flex justifyContent={"end"} mb="4">
        
                <Button>
                  Add Employee
                </Button>
              </Flex>
           
            </Flex>
          </GridItem>
          <GridItem colSpan={2} bg="white" borderRadius={"md"}>
         
              
              </Flex>
            </Flex>
            <Code/>
            <Flex>
              <VStack>
                <Flex>
                  <Text >
                  </Text>
                </Flex>
                <Flex >
                  <Text >
                  </Text>
                </Flex>
                <Flex >
                  <Text >
                  </Text>
                </Flex>
                <Flex>
                  <Text >
               
                  </Text>
                  <Text>
                </Flex>
                <Flex >
                  <Text >
                  </Text>
                </Flex>
                <Flex >
                </Flex>
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>

      <AddEmployee/>
    </React.Fragment>
  );
};

export default Employee;