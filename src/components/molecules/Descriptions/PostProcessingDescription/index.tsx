import { PostProcessingDTO } from "@/services/JobsService/dtos";
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
      label: "Fardos Pós-Processamento",
      children: `${
        postProcessing.postProcessingBales !== undefined &&
        postProcessing.postProcessingBales
      }`,
    },
    {
      label: "Peso Pós-Processamento",
      children: `${
        postProcessing.postProcessingWeight !== undefined &&
        (postProcessing.postProcessingWeight / 100).toFixed(2)
      } kg`,
    },
    {
      label: "Arrecadado",
      children: `${
        postProcessing.postProcessingRevenue !== undefined &&
        (postProcessing.postProcessingRevenue / 100).toFixed(2)
      } kg`,
    },
    {
      label: "Peso Desperdiçado",
      children: `${
        postProcessing.waste !== undefined &&
        (postProcessing.waste / 100).toFixed(2)
      } kg`,
    },
  ];

  return (
    <Descriptions
      title="Pós-Processamento"
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
      items={items}
      labelStyle={{ color: "black" }}
      contentStyle={{ color: "gray" }}
    />
  );
};
