import { Beekeeper } from "@/types/entitysType";
import { formatPhone } from "@/utils/formaters/format";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { User, UserStatus } from "@/types/authTypes";
import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface Props extends TableProps<Beekeeper> {
  onEdit?: (manager: Beekeeper) => void;
  onDelete?: (manager: Beekeeper) => void;
  onView?: (manager: Beekeeper) => void;
  onDisable?: (manager: Beekeeper) => void;
  onEnable?: (manager: Beekeeper) => void;
  onVewOwner?: (owner: User) => void;
}

export const ProdutorTable = ({
  onDelete,
  onEdit,
  onView,
  onDisable,
  onEnable,
  onVewOwner,
  ...rest
}: Props) => {
  const { user } = useContext(AuthContext);

  const columns: ColumnProps<Beekeeper>[] = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (_, item) => (
        <Typography.Link
          className=" w-full truncate flex items-center gap-2"
          title={item.profile?.name}
          onClick={() => onView?.(item)}
        >
          {item.profile?.name}
          <UserStatusTag status={item.status} />
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
        <>
          {user?.username === owner?.auth?.username ? (
            owner?.profile?.name
          ) : (
            <Typography.Link
              className=" w-full truncate flex items-center gap-2"
              title={owner?.profile?.name}
              onClick={() => owner && onVewOwner?.(owner)}
            >
              {owner?.profile?.name}
            </Typography.Link>
          )}
        </>
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
          onDisable={onDisable ? () => onDisable?.(item) : undefined}
          onEnable={onEnable ? () => onEnable?.(item) : undefined}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
