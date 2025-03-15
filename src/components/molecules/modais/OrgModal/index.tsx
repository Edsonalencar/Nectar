import { UserForm } from "@/components/organisms/UserForm";
import { AuthContext } from "@/contexts/AuthContext";
import { UserService } from "@/services/userService/service";
import { UserEdit, UserType } from "@/types";
import { User } from "@/types/authTypes";
import { Button, Flex, Form, Modal } from "antd";
import { useContext, useState } from "react";
import { OrgDescription } from "../../Descriptions/OrgDescription";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: User;
  reload?: () => Promise<void>;
}
export const OrgModal = ({ isOpen, onClose, initialData, reload }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form] = Form.useForm<UserType>();
  const { user } = useContext(AuthContext);

  const initialValues = {
    name: initialData?.profile?.name,
    email: initialData?.auth?.username,
    phone: initialData?.profile?.phone,
    document: initialData?.profile?.document,
  };

  const update = async (data: UserType) => {
    const updateUser: UserEdit = {
      name: data.name,
      phone: data.phone,
      document: data.document,
      email: data.username,
      password: data.password,
    };

    try {
      setLoading(true);
      await UserService.updateUser(user?.id as string, updateUser);
      if (reload) await reload();
      onClose();
      
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const formValue = form.getFieldsValue();
    if (initialData?.id) await update(formValue);
    form.resetFields(
      ["name", "email", "phone", "document", "password"],
    );
    setEditMode(false);
  };

  const refreshModal = () => {
    setEditMode(false);
    console.log("AAAA", form.getFieldsValue())
    form.resetFields();
    onClose();
  }

 
  return (
    <Modal
      title={editMode ? "Editar Organização" : "Organização"}
      open={isOpen}
      confirmLoading={loading}
      onCancel={refreshModal}
      onClose={refreshModal}
      onOk={submit}
      footer={null}
    >
      {editMode ? (
        <>
          <UserForm
            form={form}
            layout="vertical"
            initialValues={initialValues}
            withAuth
          />
          <Flex align="center" gap={10} className="w-full justify-end">
            <Button type="primary" onClick={submit} loading={loading}>
              Salvar
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancelar</Button>
          </Flex>
        </>
      ) : (
        <>
          <OrgDescription data={initialValues} />
          <Flex align="center" gap={10} className="w-full justify-end mt-3">
            {user?.role === "ROLE_ORG" && (
              <Button type="primary" onClick={() => setEditMode(true)}>
                Editar
              </Button>
            )}
            <Button onClick={onClose}>Cancelar</Button>
          </Flex>
        </>
      )}
    </Modal>
  );
};
