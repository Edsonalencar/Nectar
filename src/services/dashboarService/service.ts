import { ResponseDTO } from "@/types";
import { GenericService } from "../genericService/genericService";
import { Graph, MonthlyBoard } from "./dtos";
import dayjs from "dayjs";

class dashboarService extends GenericService {
  monthlyGraph = async (month: Date) => {
    var formatDate = dayjs(month).format("YYYY-MM-DD");
    const res = await this.getApi().get<ResponseDTO<Graph>>(
      `${this.getURL()}/monthly/graph?month=${formatDate}`
    );
    return res as ResponseDTO<Graph>;
  };

  monthlyBoard = async (month: Date) => {
    var formatDate = dayjs(month).format("YYYY-MM-DD");
    const res = await this.getApi().get<ResponseDTO<MonthlyBoard>>(
      `${this.getURL()}/monthly/board?month=${formatDate}`
    );
    return res as ResponseDTO<MonthlyBoard>;
  };
}

export const DashboarService = new dashboarService("/dashboard");
