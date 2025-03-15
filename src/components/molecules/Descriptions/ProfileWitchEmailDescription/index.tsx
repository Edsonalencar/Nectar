import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { Profile, User, UserStatus } from "@/types/authTypes";
import { formatCpfCnpj, formatPhone } from "@/utils/formaters/format";
import { formatDate } from "@/utils/formaters/formatDate";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { Descriptions } from "antd";
import type { DescriptionsProps } from 'antd';
import React from "react";

interface UserDetail extends Profile {
  email?: string;
  status?: UserStatus;
  owner?: User;
}

interface Props {
  data: UserDetail;
  tittle?: string | React.ReactNode;
}

export const ProfileWitchEmailDescription: React.FC<Props> = ({ data, tittle }) => {
  const items:DescriptionsProps['items'] = [
    { label: "Nome", children: data.name },
    { label: "Status", children: <UserStatusTag status={data.status} /> },
    { label: "Email", children: data.email },
    { label: "Documento", children: data.document ? formatCpfCnpj(data.document) : null },
    { label: "Telefone", children: data.phone ? formatPhone(data.phone) : "Não cadastrado" },
    ...(data.birthDate ? [{ label: "Data de Nascimento", children: formatDate(data.birthDate) }] : []),
    ...(data.owner ? [ { label: "Responsável", children: data.owner?.profile?.name }]: [])   ,
    { label: "Cadastrado Em", children: data.createdAt ? formatDateAndTime(data.createdAt) : null },
  ];

  return (
    <Descriptions
      title={tittle}
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
      contentStyle={{ color: "gray" }}
      labelStyle={{color: "black"}}
      items={items}
    />
  );
};
