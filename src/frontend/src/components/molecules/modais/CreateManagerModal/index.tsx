import { useEffect, useState } from "react";

import { Flex, Form, Modal } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { Manager } from "@/types/entitysType";
import { ManagerService } from "@/services/managerService/service";
import { UserForm } from "@/components/organisms/UserForm";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Manager;
  reload?: () => Promise<void>;
}

export const CreateManagerModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<UserType>();

  const create = async (data: UserType) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await ManagerService.create(formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("create Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: UserType) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await ManagerService.update(id, formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const formValue = form.getFieldsValue();

    if (initialData?.id) update(initialData.id, formValue);
    else create(formValue);
    closeModal();
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      const formValue = {
        ...initialData.user?.profile,
        email: initialData.user?.auth?.username,
      };

      form.setFieldsValue(formValue);
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Gestor`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <UserForm form={form} withAuth />
      </Flex>
    </Modal>
  );
};
