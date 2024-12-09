import { useEffect, useState } from "react";

import { Flex, Form, Modal, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { Beekeeper } from "@/types/entitysType";
import { ManagerService } from "@/services/managerService/service";
import { UserForm } from "@/components/organisms/UserForm";
import { UserType } from "@/types";
import { Profile } from "@/types/authTypes";
import { AddressForm } from "@/components/organisms/AddressForm";
import dayjs from "dayjs";
import { validateFormIsEmpty } from "@/utils/validations";

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
  const [form] = Form.useForm<Profile>();
  const [addressForm] = Form.useForm();

  const create = async (data: UserType) => {
    try {
      setLoading(true);
      const res = ManagerService.create(data);
      await reload?.();
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
      await ManagerService.update(id, data);
      await reload?.();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const formValue = form.getFieldsValue();
    const addressValue = addressForm.getFieldsValue();

    if (validateFormIsEmpty(addressValue.address)) {
      formValue.address = addressValue.address;
    }

    if (initialData?.id) update(initialData.id, formValue);
    else create(formValue);
    closeModal();
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      const formValue = {
        ...initialData.profile,
        birthDate: dayjs(initialData.profile?.birthDate),
      };

      form.setFieldsValue(formValue);

      addressForm.setFieldsValue({
        address: initialData.profile?.address,
      });
    }
  }, [initialData]);

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
        <UserForm form={form} />
        <Typography.Title level={5}>
          Endereço <span className="text-sm font-normal">(Opcional)</span>
        </Typography.Title>
        <AddressForm form={addressForm} />
      </Flex>
    </Modal>
  );
};