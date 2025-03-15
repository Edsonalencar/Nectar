import { Address, UserStatus } from "@/types/authTypes";
import { Dayjs } from "dayjs";

export interface CreateManagerDTO {
  status?: UserStatus; // Defaults to UserStatus.ACTIVE
  name?: string; // Nome do gerente
  email?: string; // Email
  document?: string; // Documento de identificação
  phone?: string; // Telefone
  password?: string; // Senha
  birthDate?: string | Date | Dayjs; // Data de nascimento no formato ISO (yyyy-MM-dd)
  address?: Address; // Endereço opcional ou null
}
