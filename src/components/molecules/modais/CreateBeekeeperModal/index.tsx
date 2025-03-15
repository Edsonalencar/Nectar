import { useEffect, useState } from "react";

import { Flex, Form, Modal, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { Beekeeper } from "@/types/entitysType";
import { UserType } from "@/types";
import { AddressForm } from "@/components/organisms/AddressForm";
import dayjs from "dayjs";
import { validateFormIsEmpty } from "@/utils/validations";
import { cleanMask } from "@/utils/formaters/format";
import { BeekeepersService } from "@/services/beekeepersService/service";
import { BeekeeperForm } from "@/components/organisms/BeekeeperForm";
import { CreateBeekeeperDTO } from "@/services/beekeepersService/dtos";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Beekeeper;
  reload?: () => Promise<void>;
}

export const CreateBeekeeperModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateBeekeeperDTO>();
  const [addressForm] = Form.useForm();

  const create = async (data: UserType) => {
    try {
      setLoading(true);
      await BeekeepersService.create(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("create Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: UserType) => {
    try {
      setLoading(true);
      await BeekeepersService.update(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const formValue = await form.validateFields();
    const addressValue = await addressForm.validateFields();

    if (validateFormIsEmpty(addressValue.address)) {
      formValue.address = addressValue.address;
    }

    const formData = {
      ...formValue,
      document: cleanMask(formValue.document),
    };

    if (initialData?.id) update(initialData.id, formData);
    else create(formData);
  };

  const closeModal = () => {
    form.resetFields();
    addressForm.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      const formValue = {
        ...initialData,
        ...initialData.profile,
        birthDate: dayjs(initialData.profile?.birthDate),
      };

      form.setFieldsValue(formValue);

      addressForm.setFieldsValue({
        address: initialData.profile?.address,
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Apicultor`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <Typography.Title level={5}>Dados Pessoais</Typography.Title>
        <BeekeeperForm form={form} />
        <Typography.Title level={5}>
          Endereço <span className="text-sm font-normal">(Opcional)</span>
        </Typography.Title>
        <AddressForm form={addressForm} />
      </Flex>
    </Modal>
  );
};
