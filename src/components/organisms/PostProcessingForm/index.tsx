import { PostProcessingDTO } from "@/services/JobsService/dtos";
import { FormProps } from "antd";
import { Col, Form, Row } from "antd";
import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { useEffect } from "react";

interface Props extends FormProps<PostProcessingDTO> {
  isRequired?: boolean;
  weight?: number;
}

export const PostProcessingForm = ({
  weight = 5,
  isRequired = false,
  ...rest
}: Props) => {
  const [form] = Form.useForm<PostProcessingDTO>();

  useEffect(() => {
    form.setFieldsValue({ postProcessingWeight: weight });
  }, [weight, form]);

  const handleResidueChange = (value?: string | null | number) => {
    if (value !== null && value !== undefined && weight !== undefined) {
      const postProcessingWeight = weight - Number(value); // Total depois de remover o resíduo
      const postProcessingRevenue = postProcessingWeight * 0.2;
      const postProcessingDelivered = postProcessingWeight * 0.8;

      form.setFieldsValue({
        postProcessingWeight,
        postProcessingRevenue,
        postProcessingDelivered,
      });
    }
  };

  return (
    <Form layout="vertical" form={form} {...rest}>
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
              onChange={handleResidueChange}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Total processado"
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
            label="Total entregue"
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
