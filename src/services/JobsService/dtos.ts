import { JobsStatus, ProductType } from "@/types/entitysType";
import { Dayjs } from "dayjs";

export interface CreateJobDTO {
  status?: JobsStatus; // Defaults to JobsStatus.IN_PROGRESS
  origin: string; // Origem
  appearance: string; // Aparência
  scent: string; // Cheiro
  color: string; // Cor
  weight: number;
  beekeeperId: string;
  startAt: string | Date | Dayjs;
  productType?: ProductType; // Defaults to ProductType.WAX

  postProcessing?: PostProcessingDTO;
  observation?: string;
}

export interface PostProcessingDTO {
  postProcessingWeight?: number;
  postProcessingRevenue?: number;
  postProcessingDelivered?: number;
  postProcessingResidue?: number;
}

export enum JobsStatusFilter {
  ALL = "ALL",
  IN_PROGRESS = "IN_PROGRESS",
  CONCLUDED = "CONCLUDED",
  CANCELED = "CANCELED",
}

export interface GetJobPageDTO {
  pageSize?: number; // Defaults to 10
  status?: JobsStatusFilter; // Defaults to JobsStatusFilter.ALL
}
