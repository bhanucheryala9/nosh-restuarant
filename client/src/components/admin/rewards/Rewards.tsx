import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  RewardsTestData,
  statsChartData,
} from "../../../test-data/admin/rewards";
import { RewardsRequestPayload } from "../../common/utils";
import CreateReward from "./CreateReward";
export interface RewardDataType {
  key: React.Key;
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscountAmount:number;
  appliesTo:string;
  minOrderPrice:number;
  rewardType: string;
  appliedCategory:string[] |string;
}

const Rewards = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [rewardsData, setRewardsData] = useState<RewardDataType[]>([]);
  const [showCreateRewardModal, setShowCreateRewardModal] =
    useState<boolean>(false);
  const columns: ColumnsType<RewardDataType> = [
    // {
    //   title: "Reward ID",
    //   dataIndex: "id",
    //   render: (text: string) => <a>{text}</a>,
    // },
    {
      title: "Reward Code",
      dataIndex: "code",
    },
    {
      title: "Applies To",
      dataIndex: "appliesTo",
      render:(text) => <div>{_.capitalize(text as string)}</div>
    },
    {
      title: "Category",
      dataIndex: "appliedCategory",
      
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
    },
    {
      title: "Min Order",
      dataIndex: "minOrderPrice",
    },
    {
      title: "Max Discount Amount",
      dataIndex: "maxDiscountAmount",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "45px",
    //   render: (_, record) => (
    //     <HStack>
    //       <IconButton
    //         aria-label="Search database"
    //         icon={<DeleteIcon />}
    //         size="sm"
    //       />
    //       <IconButton
    //         aria-label="Search database"
    //         icon={<EditIcon />}
    //         size="sm"
    //       />
    //     </HStack>
    //   ),
    // },
  ];

  const prepareData = (data:RewardsRequestPayload[]) =>{
    const formattedData = data.reduce(
      (accumulator: any, currentValue:RewardsRequestPayload) => {
        if(currentValue.appliedCategory){
          return [
            ...accumulator,
            {
              key: currentValue.id,
              ...currentValue,
            },
          ];
        }else{
          return [
            ...accumulator,
            {
              key: currentValue.id,
              ...currentValue,
              appliedCategory:"all"
            },
          ];
        }
      },
      []
    );
    return formattedData;
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/v1/get-rewards")
      .then((response) => {
        setRewardsData(prepareData(response.data.rewards));
      })
      .catch((error) => {
      });
  }, [showCreateRewardModal]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const StatusProps= [
    {
    name:"Total",
    quantity: 15,

  },
  {
    name:"Active",
    quantity: 14,

  },
  {
    name:"In Active",
    quantity: 1,

  },
  {
    name:"Scheduled",
    quantity: 3,

  },
]

  const gradientColor = [
    "linear-gradient(to top, #30c7ec 47%, #46aef7 70%)",
    "linear-gradient(to top, #2b5876 -30%, #4e4376 70%)",
    "linear-gradient(to top, #0ba360 0%, #3cba92 40%)",
    "linear-gradient(to top, #ff0844 -30%, #ffb199 90%)",
  ];

  const getStatusComponent = () => {
    return StatusProps.map((item, index) => {
      return (
        <GridItem colSpan={1} rowSpan={1} key={index}>
          <Flex
            bg="white"
            shadow="sm"
            px="8"
            py="5"
            rounded="md"
            alignItems={"center"}
            bgGradient={gradientColor[index]}
            textColor={"white"}
            minH="36"
            maxW={{base:"full"}}
            position={"relative"}
            backdropFilter='brightness(10%)'
          >
            <LineChart
              width={280}
              height={150}
              data={statsChartData}
              margin={{ top: 5, bottom: 5 }}
            >
              <XAxis dataKey="name" hide={true} />
              <YAxis hide={true} />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#cccdc6"
                strokeWidth={2}
                strokeOpacity={0.3}
                dot={{ r: 2 }}
                opacity={50}
              />
            </LineChart>
            <HStack position={"absolute"} mx={10} gap={3}>
              <Icon as={ChatIcon} boxSize={14} textShadow="0 0 10px black" />
              <Stat>
                <StatLabel fontSize={"xl"} textShadow="0 0 10px black">
                  {item.name}
                </StatLabel>
                <StatNumber fontSize={"4xl"} textShadow="0 0 10px black">
                  {item.quantity}
                </StatNumber>
              </Stat>
            </HStack>
          </Flex>
        </GridItem>
      );
    });
  };
  return (
    <React.Fragment>
      <Flex mx={{base:"4",lg:"10"}} my="6" direction={"column"}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={{base:"lg",lg:"xl"}} fontWeight="bold">
            Offers and Rewards
          </Text>
          <Button
            size={{base:"sm", lg:"md"}}
            colorScheme={"orange"}
            onClick={() => setShowCreateRewardModal(true)}
          >
            {" "}
            Create Coupons
          </Button>
        </Flex>

        <Grid
          my="4"
          templateRows={{base:"repeat(4, 1fr)",lg:"repeat(1, 1fr)"}}
          templateColumns={{base:"repeat(1, 1fr)",lg:"repeat(4, 1fr)"}}
          gap={{base:3,lg:4}}
        >
          {getStatusComponent()}
        </Grid>

        <Flex bg="white" p="6" mt="4" shadow={"sm"} rounded="sm">
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  // setUserProfile(record);
                },
              };
            }}
            style={{ width: "100%" }}
            scroll={{x:400}}
            size="large"
            rowSelection={rowSelection as any}
            columns={columns}
            dataSource={rewardsData}
          />
        </Flex>
      </Flex>
      <CreateReward
        isModalOpen={showCreateRewardModal}
        setIsModalOpen={setShowCreateRewardModal}
      />
    </React.Fragment>
  );
};

export default Rewards;
