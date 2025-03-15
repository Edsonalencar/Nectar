import { JobsStatusFilter } from "../JobsService/dtos";

export interface GetDashJobPageDTO {
  pageSize?: number; // Defaults to 10
  status?: JobsStatusFilter; // Defaults to JobsStatusFilter.ALL
  month?: string; // ISO format for LocalDate (yyyy-MM)
}

export interface MonthlyBoard {
  waste: number;
  revenue: number;
  newBeekeepers: number;
  concludeServices: number;
  inProcessingServices: number;
}

export interface Graph {
  month?: string;
  data: ItensGraph[];
}

export interface ItensGraph {
  day?: string;
  value?: number;
  type?: string;

  date?: string;
  startedServices?: number;
  wasteOfServices?: number;
  revenueOfServices?: number;
  recivedOfServices?: number;
}
