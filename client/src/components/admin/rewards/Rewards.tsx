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
      .delete("http://34.235.166.147:5000/api/admin/v1/delete-reward", {
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
      render: (text) => <div><b>{_.capitalize(text as string)}</b></div>,
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