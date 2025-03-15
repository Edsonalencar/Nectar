import { PostProcessingDTO } from "@/services/JobsService/dtos";
import { FormProps } from "antd";
import { Col, Form, Row } from "antd";
import { InputMoney } from "@/components/atoms/Inputs/InputMoney";

interface Props extends FormProps<PostProcessingDTO> {
  isRequired?: boolean;
  weight?: number;
}

export const PostProcessingForm = ({
  weight,
  isRequired = false,
  form,
  ...rest
}: Props) => {
  const [baseForm] = Form.useForm<PostProcessingDTO>();
  const postProcessingForm = form ? form : baseForm;

  const handleResidueChange = (value: number) => {
    if (weight === 0) return;

    if (value !== null && value !== undefined && weight !== undefined) {
      const postProcessingWeight = weight - Number(value); // Total depois de remover o resíduo
      const postProcessingRevenue = postProcessingWeight * 0.2;
      const postProcessingDelivered = postProcessingWeight * 0.8;

      postProcessingForm.setFieldsValue({
        postProcessingWeight,
        postProcessingRevenue,
        postProcessingDelivered,
      });
    }
  };

  return (
    <Form layout="vertical" form={postProcessingForm} {...rest}>
      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Resíduo"
            name="postProcessingResidue"
            key="postProcessingResidue"
            id="postProcessingResidue"
            rules={[
              {
                required: isRequired,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <InputMoney
              placeholder="00,00"
              unit="Kg"
              style={{ width: "100%" }}
              onChange={(value) => value && handleResidueChange(Number(value))}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Total limpo"
            name="postProcessingWeight"
            key="postProcessingWeight"
          >
            <InputMoney
              placeholder="00,00"
              unit="Kg"
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Arrecadado"
            name="postProcessingRevenue"
            key="postProcessingRevenue"
          >
            <InputMoney
              placeholder="00,00"
              unit="Kg"
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Para o produtor"
            name="postProcessingDelivered"
            key="postProcessingDelivered"
          >
            <InputMoney
              placeholder="00,00"
              unit="Kg"
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
