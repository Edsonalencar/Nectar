import { UserStatus } from "@/types/authTypes";
import { userStatusSerialize } from "@/utils/serializers";
import { Tag } from "antd";

export const UserStatusTag: React.FC<{ status?: UserStatus }> = ({
  status,
}) => {
  const getColor = (status?: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "green";
      case UserStatus.INACTIVE:
        return "red";
      default:
        return "default";
    }
  };

  return (
    <Tag color={getColor(status)} style={{ fontSize: 10, lineHeight: "none" }}>
      {userStatusSerialize(status)}
    </Tag>
  );
};
