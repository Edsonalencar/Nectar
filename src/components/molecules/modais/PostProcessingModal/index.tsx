import { useState } from "react";
import { Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";

import { Job } from "@/types/entitysType";
import { CreateJobDTO, PostProcessingDTO } from "@/services/JobsService/dtos";
import { JobsService } from "@/services/JobsService/service";
import { PostProcessingForm } from "@/components/organisms/PostProcessingForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Job;
  reload?: () => Promise<void>;
}

export const PostProcessingModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [postProcessingForm] = Form.useForm<PostProcessingDTO>();

  const update = async (id: string, data: CreateJobDTO) => {
    try {
      setLoading(true);
      await JobsService.update(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!initialData) return;
    const postProcessingValue = await postProcessingForm.validateFields();

    const postProcessing: PostProcessingDTO = {
      postProcessingBales: postProcessingValue?.postProcessingBales!!,
      postProcessingWeight: postProcessingValue?.postProcessingWeight!! * 100,
      postProcessingRevenue: postProcessingValue?.postProcessingRevenue!! * 100,
      waste: postProcessingValue?.waste!! * 100,
    };

    const formValue: CreateJobDTO = {
      ...initialData,
      beekeeperId: initialData!!.beekeeper?.id!!,
      startAt: initialData.startAt!!,
      postProcessing,
    };

    if (initialData?.id) update(initialData.id, formValue);
    closeModal();
  };

  const closeModal = () => {
    postProcessingForm.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`Adicionar Pós-processamento`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={1000}
    >
      <div className="mt-6">
        <LoadingContent isLoading={loading} />
        <PostProcessingForm form={postProcessingForm} isRequired />
      </div>
    </Modal>
  );
};
