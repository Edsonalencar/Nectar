import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { Address } from "@/types/authTypes";
import { Map } from "@/types";

export async function copyText(link?: string) {
  if (!link) return;

  try {
    await navigator.clipboard.writeText(link);
    toast.success("Link copiado com sucesso!");
  } catch (err) {
    toast.success("Falha ao copiar o link!");
  }
}
export const saveCredentialsToLocalStorage = (
  email: string,
  password: string
): void => {
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
};
export const getCredentialsFromLocalStorage = (): {
  email: string | null;
  password: string | null;
} => {
  const email = localStorage.getItem("userEmail");
  const password = localStorage.getItem("userPassword");
  return { email, password };
};
export const clearCredentialsToLocalStorage = (): void => {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");
};

export const getContrastColor = (hexColor?: string) => {
  if (!hexColor) return "black";
  hexColor = hexColor.replace("#", "");

  // Converte a cor para componentes RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calcula o brilho usando a fórmula de luminância relativa
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna preto para cores claras e branco para cores escuras
  return brightness > 128 ? "black" : "white";
};

export const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function calculateAge(birthDate?: string) {
  if (!birthDate) return undefined;

  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age + " anos";
}

export const formatterAddres = (address?: Address) => {
  if (!address) return "Não informado";
  return `${address?.city}/${address?.state}`;
};

export function getNextRepetitionDate(
  repetitionType: string,
  repetitionNumber: number,
  startDate: Date = new Date() // opcionalmente, você pode fornecer uma data de início
): Date {
  let nextDate = new Date(startDate); // Copia a data de início

  if (repetitionNumber == 0) return nextDate;

  switch (repetitionType) {
    case "SINGLE":
      return nextDate; // Retorna a data de início sem alteração

    case "WEEKLY":
      nextDate.setDate(nextDate.getDate() + 7 * repetitionNumber);
      break;

    case "BIWEEKLY":
      nextDate.setDate(nextDate.getDate() + 14 * repetitionNumber);
      break;

    case "MONTHLY":
      nextDate.setMonth(nextDate.getMonth() + repetitionNumber);
      break;

    default:
      throw new Error("Tipo de repetição inválido");
  }

  return nextDate;
}

export const convertBoleanToString = (value?: boolean) => {
  return value ? "Sim" : "Não";
};

export const disablePastDates = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf("day");
};

export const convertRcFileToFile = (rcFile: RcFile): File => {
  return new File([rcFile], rcFile.name, { type: rcFile.type });
};

export const produtcTypeOptions = [
  { label: "Cera", value: "WAX" },
  { label: "Mel", value: "HONEY" },
  // { label: "Pólen", value: "POLLEN" },
  // { label: "Própolis", value: "PROPOLIS" },
];

export const booleanSelectOptions = [
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

export const stateOptions = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const waxColorSchema: Map = {
  A: "#FFDD8F", // Mel Extra Claro
  B: "#FFC65A", // Mel Claro
  C: "#FFB347", // Mel Âmbar Claro
  D: "#E69B40", // Mel Âmbar
  E: "#C47E3F", // Mel Âmbar Escuro
  F: "#A45B2A", // Mel Âmbar Avermelhado
  G: "#814D1B", // Mel Escuro
  H: "#5A3214", // Mel Muito Escuro
};
