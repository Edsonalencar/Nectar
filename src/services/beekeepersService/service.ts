import { GenericService } from "../genericService/genericService";

class beekeepersService extends GenericService {
  disableBeekeeper = async (
    beekeeperId: string,
    data: "ACTIVE" | "INACTIVE"
  ) => {
    const res = await this.getApi().put(
      `${this.getURL()}/${beekeeperId}/status`,
      { status: data }
    );
    return res;
  };
}

export const BeekeepersService = new beekeepersService("/beekeepers");
