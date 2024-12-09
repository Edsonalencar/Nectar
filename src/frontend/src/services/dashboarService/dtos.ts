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
  ConcludeServices: number;
  inProcessingServices: number;
}

export interface Graph {
  month?: string;
  data: ItensGraph[];
}

export interface ItensGraph {
  date?: string;
  startedServices: number;
  MediaWasteOfServices: number;
  MediaRevenueOfServices: number;
}