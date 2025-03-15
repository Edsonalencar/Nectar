import { PostProcessingDTO } from "@/services/JobsService/dtos";
import { longToKg } from "@/utils/utils";
import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib";

interface PostProcessingDescriptionProps {
  postProcessing: PostProcessingDTO;
}

export const PostProcessingDescription: React.FC<
  PostProcessingDescriptionProps
> = ({ postProcessing }) => {
  const items: DescriptionsProps["items"] = [
    {
      label: "Peso Pós-Processamento",
      children: longToKg(postProcessing.postProcessingWeight),
    },
    {
      label: "Arrecadado",
      children: longToKg(postProcessing.postProcessingRevenue),
    },
    {
      label: "Peso Entregue",
      children: longToKg(postProcessing.postProcessingDelivered),
    },
    {
      label: "Peso Resíduo",
      children: longToKg(postProcessing.postProcessingResidue),
    },
  ];

  return (
    <Descriptions
      title="Pós-Processamento"
      layout="vertical"
      column={{ xxl: 4, xl: 4, lg: 3, md: 1, sm: 1, xs: 1 }}
      items={items}
      labelStyle={{ color: "black" }}
      contentStyle={{ color: "gray" }}
    />
  );
};
