import { JobsStatus } from "@/types/entitysType";
import { jobStatusSerialize } from "@/utils/serializers";
import { Tag } from "antd";

export const JobStatusTag: React.FC<{ status?: JobsStatus }> = ({ status }) => {
  const getColor = (status?: JobsStatus) => {
    switch (status) {
      case JobsStatus.CANCELED:
        return "red";
      case JobsStatus.IN_PROGRESS:
        return "cyan";
      case JobsStatus.CONCLUDED:
        return "green";

      default:
        return "default";
    }
  };

  return <Tag color={getColor(status)}>{jobStatusSerialize(status)}</Tag>;
};
