import { Beekeeper, Job, JobsStatus } from "@/types/entitysType";
import { formatDate } from "@/utils/formaters/formatDate";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { productTypeSerialize } from "@/utils/serializers";
import { JobStatusTag } from "@/components/atoms/JobStatusTag";
import { useMemo } from "react";
import { UserStatusTag } from "@/components/atoms/UserStatusTag";

interface Props extends TableProps<Job> {
  onEdit?: (job: Job) => void;
  onCancel?: (job: Job) => void;
  onView?: (job: Job) => void;
  onProcess?: (job: Job) => void;
  onViewBeekeeper?: (beekeeper: Beekeeper) => void;
  noBeekeeper?: boolean;
}

export const JobsTable = ({
  onCancel,
  onEdit,
  onProcess,
  onView,
  onViewBeekeeper,
  noBeekeeper = false,
  ...rest
}: Props) => {
  const mountCustomActions = (job: Job) => {
    const actions = [];

    if (onCancel && job.status != JobsStatus.CANCELED) {
      actions.push({
        label: "Cancelar",
        on: () => onCancel(job),
      });
    }

    if (onProcess && job.status === JobsStatus.IN_PROGRESS) {
      actions.push({
        label: "Processar",
        on: () => onProcess(job),
      });
    }

    return actions;
  };

  const columns: ColumnProps<Job>[] = useMemo(() => {
    const columns: ColumnProps<Job>[] = [
      {
        title: "Iniciado em",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (_, { createdAt }) => formatDate(createdAt),
      },
      {
        title: "Tipo Processamento",
        dataIndex: "productType",
        key: "productType",
        render: (_, { productType }) => productTypeSerialize(productType),
      },
      {
        title: "Recebido/Entregue",
        dataIndex: "weight",
        key: "weight",
        render: (_, { weight, postProcessingWeight }) =>
          `${weight}Kg /${
            postProcessingWeight ? postProcessingWeight : 0
          }Kg`,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => <JobStatusTag status={status} />,
      },
      {
        title: "Arrecadado",
        dataIndex: "postProcessingRevenue",
        key: "postProcessingRevenue",
        render: (_, { postProcessingRevenue }) =>
          (postProcessingRevenue ? postProcessingRevenue : 0) + "Kg",
      },
      {
        title: "Perdido",
        dataIndex: "waste",
        key: "waste",
        render: (_, { waste }) => (waste ? waste : 0) + "Kg",
      },
      {
        title: "Ações",
        dataIndex: "actions",
        key: "actions",
        render: (_, item) => (
          <ActionsMenu
            onEdit={onEdit ? () => onEdit?.(item) : undefined}
            onView={onView ? () => onView?.(item) : undefined}
            actions={mountCustomActions(item)}
          />
        ),
      },
    ];

    if (!noBeekeeper) {
      columns.unshift({
        title: "Produtor",
        dataIndex: "beekeeper",
        key: "nome",
        render: (_, { beekeeper }) => (
          <Typography.Link
            className="w-full truncate flex items-center gap-2"
            onClick={() => beekeeper && onViewBeekeeper?.(beekeeper)}
            title={beekeeper?.profile?.name}
          >
            {beekeeper?.profile?.name}
            <UserStatusTag status={beekeeper?.status} />
          </Typography.Link>
        ),
      });
    }

    columns.unshift({
      title: "Ind.",
      dataIndex: "id",
      key: "id",
      className: "text-sm",
      render: (_, item) => (
        <Typography.Link onClick={() => onView?.(item)}>
          {item.id?.substring(0, 8)}
        </Typography.Link>
      ),
    });

    return columns;
  }, [noBeekeeper]);

  return <Table columns={columns} {...rest} />;
};
