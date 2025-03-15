import { User } from "@/types/authTypes";
import { LoginType, ResponseDTO, UserEdit } from "../../types";
import { BaseApi } from "../baseAPI";
import { AbstractException } from "../handler/AbstractException";

const API = new BaseApi();

export class UserService {
  static async login({
    username,
    password,
  }: LoginType): Promise<ResponseDTO<string>> {
    const res = await API.postNoAuth("/users/login", {
      username,
      password,
    });

    if (res == undefined)
      throw new AbstractException("Alguma coisa aconteceu errado!");

    return res as ResponseDTO<string>;
  }

  static async getById(id: string):Promise<ResponseDTO<User>> {
    const res = await API.get("/users/" + id);
    return res as ResponseDTO<User>;
  };

  static async updateUser(userId:string, data:UserEdit): Promise<ResponseDTO<User>> {
    const res = await API.put("/users/"+userId, data);
    return res as ResponseDTO<User>;
  }
}
