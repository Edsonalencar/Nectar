import { ResponseDTO } from "@/types";
import { GenericService } from "../genericService/genericService";
import { GetJobPageDTO } from "./dtos";

class jobsService extends GenericService {
  getBeekeeperPage = async <T>(
    beekeeperId: number | string,
    page: number | string,
    data: GetJobPageDTO,
    headers?: Record<string, string>
  ) => {
    const res = await this.getApi().post<ResponseDTO<T>, GetJobPageDTO>(
      `${this.getURL()}/beekeeper/${beekeeperId}/page/${page}`,
      data,
      headers
    );

    return res as ResponseDTO<T>;
  };
}

export const JobsService = new jobsService("/jobs");
