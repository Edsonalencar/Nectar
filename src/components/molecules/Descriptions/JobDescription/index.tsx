import { JobStatusTag } from "@/components/atoms/JobStatusTag";
import { WaxColorView } from "@/components/atoms/WaxColorView";
import { Job } from "@/types/entitysType";
import { formatDate } from "@/utils/formaters/formatDate";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { productTypeSerialize } from "@/utils/serializers";
import { Descriptions, DescriptionsProps } from "antd";

interface JobDescriptionProps {
  job?: Job;
  title?: string | React.ReactNode;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  job,
  title = `Serviço`,
}) => {
  const items: DescriptionsProps["items"] = [
    { label: "Origem", children: job?.origin },
    { label: "Aparência", children: job?.appearance },
    ...(job?.scent ? [{ label: "Cheiro", children: job?.scent }] : []),
    ...(job?.color
      ? [{ label: "Cor", children: <WaxColorView color={job?.color} /> }]
      : []),
    { label: "Pesticidas", children: job?.pesticides ? "Sim" : "Não" },
    { label: "Perda de Enxame", children: job?.hiveLoss ? "Sim" : "Não" },
    { label: "Quantidade de Fardos", children: job?.quantityOfBales },
    {
      label: "Peso Total",
      children: `${(job?.weight ? job.weight / 100 : 0).toFixed(2)} kg`,
    },
    { label: "Data de Início", children: formatDate(job?.startAt) },
    ...(job?.observation
      ? [{ label: "Observações", children: job?.observation }]
      : []),
    {
      label: "Tipo de Produto",
      children: productTypeSerialize(job?.productType),
    },
    { label: "Status", children: <JobStatusTag status={job?.status} /> },
    ...(job?.beekeeper
      ? [{ label: "Apicultor", children: job?.beekeeper?.profile?.name }]
      : []),
    ...(job?.owner
      ? [{ label: "Responsável", children: job?.owner?.profile?.name }]
      : []),
    ...(job?.createdAt
      ? [{ label: "Criado Em", children: formatDateAndTime(job?.createdAt) }]
      : []),
  ];
  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
      items={items}
      labelStyle={{ color: "black" }}
      contentStyle={{ color: "gray" }}
    />
  );
};
