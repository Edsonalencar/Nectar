import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { Beekeeper } from "@/types/entitysType";
import { formatCpfCnpj, formatPhone } from "@/utils/formaters/format";
import { formatDate } from "@/utils/formaters/formatDate";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { booleanSerializer } from "@/utils/serializers";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import React from "react";

interface Props {
  data: Beekeeper;
  tittle?: string | React.ReactNode;
}

export const BeekeeperDescription: React.FC<Props> = ({ data, tittle }) => {
  const items: DescriptionsProps["items"] = [
    { label: "Nome", children: data.profile?.name },
    { label: "Status", children: <UserStatusTag status={data.status} /> },
    { label: "Email", children: data.email },
    {
      label: "Documento",
      children: data.profile?.document
        ? formatCpfCnpj(data.profile.document)
        : null,
    },
    {
      label: "Telefone",
      children: data.profile?.phone
        ? formatPhone(data.profile?.phone)
        : "Não cadastrado",
    },
    ...(data.profile?.birthDate
      ? [
          {
            label: "Data de Nascimento",
            children: formatDate(data.profile?.birthDate),
          },
        ]
      : []),
    ...(data.owner
      ? [{ label: "Responsável", children: data.owner?.profile?.name }]
      : []),
    {
      label: "Perca de enxames",
      children: data.hasHiveLoss
        ? booleanSerializer(data.hasHiveLoss)
        : "Não informado",
    },
    {
      label: "Pesticida proximo",
      children: data.hasPesticides
        ? booleanSerializer(data.hasPesticides)
        : "Não informado",
    },
    {
      label: "Cadastrado Em",
      children: data.createdAt ? formatDateAndTime(data.createdAt) : null,
    },
  ];

  return (
    <Descriptions
      title={tittle}
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
      contentStyle={{ color: "gray" }}
      labelStyle={{ color: "black" }}
      items={items}
    />
  );
};
