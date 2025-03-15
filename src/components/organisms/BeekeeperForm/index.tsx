import { FormProps, Select, Switch } from "antd";
import { Col, Form, Input, Row } from "antd";
import { InputCpf } from "@/components/atoms/Inputs/InputCpf";
import { InputPhone } from "@/components/atoms/Inputs/InputPhone";
import { CreateBeekeeperDTO } from "@/services/beekeepersService/dtos";
import { booleanSelectOptions } from "@/utils/utils";

interface Props extends FormProps<CreateBeekeeperDTO> {
  withAuth?: boolean;
}

export const BeekeeperForm = ({ withAuth = false, ...rest }: Props) => {
  return (
    <Form layout="vertical" {...rest}>
      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Nome Completo"
            name={"name"}
            key={"name"}
            id="name"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <Input placeholder="Nome completo" />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Email"
            name={"email"}
            key={"email"}
            id="email"
            rules={[
              {
                required: withAuth,
                message: "Campo obrigatório!",
              },
            ]}
            tooltip={
              withAuth
                ? "Esse email será utilizado para acessar o sistema"
                : undefined
            }
          >
            <Input placeholder="gestor@email.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Documento"
            name={"document"}
            key={"document"}
            id="document"
          >
            <InputCpf placeholder="CPF" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 6 }}>
          <Form.Item label="Telefone" name={"phone"} key={"phone"} id="phone">
            <InputPhone placeholder="Telefone" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Pesticidas prox."
            name={"hasPesticides"}
            key={"hasPesticides"}
            id="hasPesticides"
            initialValue={false}
          >
            <Select options={booleanSelectOptions} />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Form.Item
            label="Perda de enxame"
            name={"hasHiveLoss"}
            key={"hasHiveLoss"}
            id="hasHiveLoss"
            initialValue={false}
          >
            <Select options={booleanSelectOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {withAuth && (
          <Col span={24} md={{ span: 8 }}>
            <Form.Item
              label="Senha"
              name={"password"}
              key={"password"}
              id="password"
              rules={[
                {
                  required: true,
                  message: "Campo obrigatório!",
                },
              ]}
              tooltip="Essa senha será utilizada para acessar o sistema"
            >
              <Input.Password
                id="password"
                type="password"
                placeholder="Digite a senha do gestor"
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};
