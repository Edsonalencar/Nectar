import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export const ToBack: React.FC = () => {
  const navigate = useNavigate();

  const toBack = () => {
    navigate(-1);
  };

  return (
    <Button
      type="text"
      onClick={toBack}
      className="flex items-center gap-2 w-min text-sm"
    >
      <FaArrowLeft /> Voltar
    </Button>
  );
};
