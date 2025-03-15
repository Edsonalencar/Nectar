import { Auth, Profile, Role, User, UserStatus } from "./authTypes";

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
  startAt: string;
  weight: number; // Peso total

  postProcessingWeight?: number;
  postProcessingRevenue?: number;
  postProcessingDelivered?: number;
  postProcessingResidue?: number;
  residueRate?: number; // Taxa de desperdício

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
  hasPesticides: boolean;
  hasHiveLoss: boolean;
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
