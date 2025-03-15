import { Address, UserStatus } from "@/types/authTypes";
import { Dayjs } from "dayjs";

export interface GetJobPageDTO {
  pageSize?: number; // Defaults to 10
  status?: UserStatus; // Defaults to JobsStatusFilter.ALL
}

export interface CreateBeekeeperDTO {
  status?: UserStatus;
  hasPesticides: boolean;
  hasHiveLoss: boolean;
  name: string;
  email: string;
  document: string;
  phone: string;
  birthDate: string | Dayjs;
  address?: Address;
}
