import { Line, ColumnConfig } from "@ant-design/plots";
import { formatCurrency } from "@/utils/formaters/formatCurrency";

import { ItensGraph } from "@/services/dashboarService/dtos";

interface Props {
  data: ItensGraph[];
}

export default function FlowGraph({ data }: Props) {
  const config: ColumnConfig = {
    data,
    height: 300,
    xField: "day",
    yField: "value",
    colorField: "type",
    scale: { color: { range: ["#ffb300", "#3C8117", "#CC1248"] } },
    axis: {
      y: {
        labelFormatter: (v: any) => formatCurrency(Number(v),"kg"),
      },
    },
    tooltip: { channel: "y", valueFormatter: (d) => formatCurrency(Number(d),"kg") },
  };

  return <Line {...config} />;
}
