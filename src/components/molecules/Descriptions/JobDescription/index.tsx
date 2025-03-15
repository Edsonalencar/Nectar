import { JobStatusTag } from "@/components/atoms/JobStatusTag";
import { WaxColorView } from "@/components/atoms/WaxColorView";
import { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/types/authTypes";
import { Beekeeper, Job } from "@/types/entitysType";
import { formatDate } from "@/utils/formaters/formatDate";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { productTypeSerialize } from "@/utils/serializers";
import { longToKg } from "@/utils/utils";
import { Descriptions, DescriptionsProps, Typography } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface JobDescriptionProps {
  job?: Job;
  title?: string | React.ReactNode;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  job,
  title = `Serviço`,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBeekeeperView = (beekeeper: Beekeeper) => {
    navigate(`/apicultor/${beekeeper.id}`);
  };

  const handleManagerView = (user: User) => {
    navigate(`/gestor/${user?.id}`);
  };

  const items: DescriptionsProps["items"] = [
    { label: "Origem", children: job?.origin },
    { label: "Aparência", children: job?.appearance },
    ...(job?.scent ? [{ label: "Cheiro", children: job?.scent }] : []),
    ...(job?.color
      ? [{ label: "Cor", children: <WaxColorView color={job?.color} /> }]
      : []),

    { label: "Data de Início", children: formatDate(job?.startAt) },
    ...(job?.observation
      ? [{ label: "Observações", children: job?.observation }]
      : []),
    {
      label: "Tipo de Produto",
      children: productTypeSerialize(job?.productType),
    },
    { label: "Status", children: <JobStatusTag status={job?.status} /> },
    {
      label: "Peso Recebido",
      children: longToKg(job?.weight),
    },
    ...(job?.beekeeper
      ? [
          {
            label: "Apicultor",
            children: (
              <Typography.Link
                onClick={() =>
                  job?.beekeeper && handleBeekeeperView(job?.beekeeper)
                }
              >
                {job?.beekeeper?.profile?.name}
              </Typography.Link>
            ),
          },
        ]
      : []),
    ...(job?.owner
      ? [
          {
            label: "Responsável",
            children: (
              <>
                {user?.username === job.owner?.auth?.username ? (
                  job.owner?.profile?.name
                ) : (
                  <Typography.Link
                    className=" w-full truncate flex items-center gap-2"
                    title={job.owner?.profile?.name}
                    onClick={() => job?.owner && handleManagerView(job.owner)}
                  >
                    {job.owner?.profile?.name}
                  </Typography.Link>
                )}
              </>
            ),
          },
        ]
      : []),
    ...(job?.createdAt
      ? [{ label: "Criado Em", children: formatDateAndTime(job?.createdAt) }]
      : []),
  ];
  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 4, lg: 3, md: 1, sm: 1, xs: 1 }}
      items={items}
      labelStyle={{ color: "black" }}
      contentStyle={{ color: "gray" }}
    />
  );
};
