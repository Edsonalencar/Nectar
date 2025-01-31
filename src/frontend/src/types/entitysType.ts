import { Profile, User, UserStatus } from "./authTypes";

export enum JobsStatus {
  CONCLUDED = "CONCLUDED",
  IN_PROGRESS = "IN_PROGRESS",
  CANCELED = "CANCELED",
}

export enum ProductType {
  HONEY = "HONEY",
  POLLEN = "POLLEN",
  PROPOLIS = "PROPOLIS",
  WAX = "WAX",
}

export interface Job {
  id?: string; // UUID, gerado automaticamente se não for fornecido

  origin: string; // Origem
  appearance: string; // Aparência
  scent: string; // Cheiro
  color: string; // Cor

  pesticides: boolean; // Pesticidas
  hiveLoss: boolean; // Perda de enxame

  quantityOfBales: number; // Quantidade de fardos
  weight: number; // Peso total
  startAt: string;

  postProcessingBales?: number; // Quantidade de fardos pós-processamento
  postProcessingWeight?: number; // Peso total pós-processamento
  postProcessingRevenue?: number; // Arrecadado
  waste?: number; // Peso desperdiçado
  wasteRate?: number; // Taxa de desperdício

  observation?: string; // Observações

  productType: ProductType; // Tipo de produto, padrão ProductType.WAX
  status: JobsStatus; // Status do trabalho, padrão JobsStatus.IN_PROGRESS

  beekeeper?: Beekeeper; // ID do apicultor, referência para beekeeper
  owner?: User;
  org?: User;

  createdAt?: string; // Data de criação no formato ISO
}

export interface Beekeeper {
  id?: string; // UUID, gerado automaticamente se não fornecido
  status: UserStatus; // Status do usuário, padrão UserStatus.ACTIVE
  email?: string; // Email pode ser opcional ou nulo
  profile?: Profile; // Relacionamento com Profile
  owner?: User; // ID do proprietário, referência para User
  org?: User; // ID da organização, referência para User
  createdAt?: string; // Data de criação no formato ISO
}

export interface Manager {
  id?: string;
  user?: User;
  org?: User;
  createdAt?: string;
}
