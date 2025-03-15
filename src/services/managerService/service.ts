import { ResponseDTO } from "@/types";
import { GenericService } from "../genericService/genericService";


export class managerService extends GenericService {
    disableManager = async <T>(managerId:string, data:"ACTIVE" | "INACTIVE") => {
        const res = await this.getApi().put<ResponseDTO<T>,String>(`${this.getURL()}/${managerId}/status`, data);
        return res;
    }
}

export const ManagerService = new managerService("/managers");
