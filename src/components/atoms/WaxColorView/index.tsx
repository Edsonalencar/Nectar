import { waxColorSchema } from "@/utils/utils";

interface WaxColorViewProps {
  color: string;
}

export const WaxColorView: React.FC<WaxColorViewProps> = ({ color }) => {
  return (
    <div
      style={{
        width: "2rem",
        height: "2rem",
        backgroundColor: waxColorSchema[color] as string, // Amarelo-500
        border: "2px solid transparent",
        borderRadius: "0.375rem", // rounded-md
      }}
    ></div>
  );
};
