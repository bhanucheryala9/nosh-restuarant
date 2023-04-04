import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import Table, { ColumnsType } from "antd/es/table";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { useNotification } from "../../../contexts/Notification";
import {
  statsChartData,
} from "../../../test-data/admin/rewards";
import { NotificationStatus, RewardsRequestPayload } from "../../common/utils";
import CreateReward from "./CreateReward";
export interface RewardDataType {
  key: React.Key;
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscountAmount: number;
  appliesTo: string;
  minOrderPrice: number;
  rewardType: string;
  appliedCategory: string[] | string;
  startTime: string;
  endTime: string;
}

const Rewards = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [rewardsData, setRewardsData] = useState<RewardDataType[]>([]);
  const [forUpdate, setForUpdate] = useState<boolean>(false);
  const [toUpdateData, setToUpdateData] = useState();
  const [statsData, setStatsData] = useState({});
  const [showCreateRewardModal, setShowCreateRewardModal] =
    useState<boolean>(false);
  const { setShowNotification } = useNotification();

  const onUpdateClicked = (data: any) => {
    setToUpdateData(data);
    setForUpdate(true);
    setShowCreateRewardModal(true);
  };

  const onDeleteClicked = (data: any) => {
    axios
      .delete("http://localhost:5000/api/admin/v1/delete-reward", {
        params: {
          id: data.id,
        },
      })
      .then((response: any) => {
        setRewardsData(prepareData(response.data.rewards));
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Successfully deleted item!",
          showAlert: true,
        });
      })
      .catch(() => {
        setShowNotification({
          status: NotificationStatus.ERROR,
          alertMessage: "Failed to retreive rewards information..!",
          showAlert: true,
        });
      });
  };

  const prepareStatsData = (data: any) => {
    const stats = data?.reduce(
      (acc: any, current: any) => {
        if (new Date(Number(current.endTime)) < new Date()) {
          return { ...acc, inactive: acc.inactive + 1 };
        } else if (new Date(Number(current.startTime)) > new Date()) {
          return { ...acc, scheduled: acc.scheduled + 1 };
        } else if (
          new Date(Number(current.startTime)) <= new Date() &&
          new Date(Number(current.endTime)) >= new Date()
        ) {
          return { ...acc, active: acc.active + 1 };
        }
        else{
          return acc
        }
      },
      {
        total: data?.length || 0,
        active: 0,
        inactive: 0,
        scheduled: 0,
      }
    );
    setStatsData(stats);
  };

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
      render: (text) => <div>{_.capitalize(text as string)}</div>,
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
    {
      title: "Action",
      key: "action",
      width: "45px",
      render: (_, record) => (
        <HStack>
          <IconButton
            aria-label="Search database"
            onClick={() => {
              onDeleteClicked(record);
            }}
            icon={<DeleteIcon />}
            size="sm"
          />
          <IconButton
            aria-label="Search database"
            onClick={() => onUpdateClicked(record)}
            icon={<EditIcon />}
            size="sm"
          />
        </HStack>
      ),
    },
  ];

  const prepareData = (data: RewardsRequestPayload[]) => {
    const formattedData = data.reduce(
      (accumulator: any, currentValue: RewardsRequestPayload) => {
        if (currentValue.appliedCategory) {
          return [
            ...accumulator,
            {
              key: currentValue.id,
              ...currentValue,
            },
          ];
        } else {
          return [
            ...accumulator,
            {
              key: currentValue.id,
              ...currentValue,
              appliedCategory: "all",
            },
          ];
        }
      },
      []
    );
    return formattedData;
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/v1/get-rewards")
      .then((response) => {
        setRewardsData(prepareData(response.data.rewards));
        prepareStatsData(prepareData(response.data.rewards));
      })
      .catch((error) => {});
  }, [showCreateRewardModal]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const StatusProps = (prop: string) => {
    if (prop === "total") return "Total";
    else if (prop === "active") return "Active";
    else if (prop === "inactive") return "In Active";
    else if (prop === "scheduled") return "Scheduled";
  }

  const gradientColor = [
    "linear-gradient(to top, #30c7ec 47%, #46aef7 70%)",
    "linear-gradient(to top, #2b5876 -30%, #4e4376 70%)",
    "linear-gradient(to top, #0ba360 0%, #3cba92 40%)",
    "linear-gradient(to top, #ff0844 -30%, #ffb199 90%)",
  ];

  const getStatusComponent = () => {
    return Object.entries(statsData || {}).map((item: any, index) => {
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
            maxW={{ base: "full" }}
            position={"relative"}
            backdropFilter="brightness(10%)"
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
                  {StatusProps(item[0])}
                </StatLabel>
                <StatNumber fontSize={"4xl"} textShadow="0 0 10px black">
                  {item[1]}
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
      <Flex mx={{ base: "4", lg: "10" }} my="6" direction={"column"}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="bold">
            Offers and Rewards
          </Text>
          <Button
            size={{ base: "sm", lg: "md" }}
            colorScheme={"orange"}
            onClick={() => setShowCreateRewardModal(true)}
          >
            {" "}
            Create Coupons
          </Button>
        </Flex>

        <Grid
          my="4"
          templateRows={{ base: "repeat(4, 1fr)", lg: "repeat(1, 1fr)" }}
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 3, lg: 4 }}
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
            scroll={{ x: 400 }}
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
        forUpdate={forUpdate}
        setForUpdate={setForUpdate}
        defaultData={toUpdateData}
      />
    </React.Fragment>
  );
};

export default Rewards;
