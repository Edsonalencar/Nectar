import { Beekeeper, Manager } from "@/types/entitysType";
import { formatPhone } from "@/utils/formaters/format";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { User, UserStatus } from "@/types/authTypes";
import { UserStatusTag } from "@/components/atoms/UserStatusTag";

interface Props extends TableProps<Beekeeper> {
  onEdit?: (manager: Beekeeper) => void;
  onDelete?: (manager: Beekeeper) => void;
  onView?: (manager: Beekeeper) => void;
  onDesable?: (manager: Beekeeper) => void;
  onVewOwner?: (owner: User) => void;
}

export const ProdutorTable = ({
  onDelete,
  onEdit,
  onView,
  onDesable,
  onVewOwner,
  ...rest
}: Props) => {
  const columns: ColumnProps<Beekeeper>[] = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (_, { profile, id, status }) => (
        <Typography.Link
          className=" w-full truncate flex items-center gap-2"
          title={profile?.name}
          onClick={() => onView?.({ id, status })}
        >
          {profile?.name}
          <UserStatusTag status={status} />
        </Typography.Link>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { email }) => (email ? email : "-"),
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
      render: (_, { profile }) =>
        profile?.phone ? formatPhone(profile?.phone) : "-",
    },
    {
      title: "Responsável",
      dataIndex: "responsableName",
      key: "responsableName",
      render: (_, { owner }) => (
        <Typography.Link
          className=" w-full truncate flex items-center gap-2"
          title={owner?.profile?.name}
          onClick={() => owner && onVewOwner?.(owner)}
        >
          {owner?.profile?.name}
        </Typography.Link>
      ),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onDelete={
            onDelete && item.status == UserStatus.ACTIVE
              ? () => onDelete?.(item)
              : undefined
          }
          onEdit={onEdit ? () => onEdit?.(item) : undefined}
          onView={onView ? () => onView?.(item) : undefined}
          onDesable={onDesable ? () => onDesable?.(item) : undefined}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
