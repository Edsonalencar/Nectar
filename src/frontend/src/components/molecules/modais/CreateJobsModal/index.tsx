import { useEffect, useState } from "react";

import { Flex, Form, Modal, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { Job } from "@/types/entitysType";
import { CreateJobDTO, PostProcessingDTO } from "@/services/JobsService/dtos";
import { JobsService } from "@/services/JobsService/service";
import { JobForm } from "@/components/organisms/JobForm";
import { PostProcessingForm } from "@/components/organisms/PostProcessingForm";
import { validateFormIsEmpty } from "@/utils/validations";
import dayjs from "dayjs";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Job;
  beekeeperId?: string;
  reload?: () => Promise<void>;
}

export const CreateJobsModal = ({
  isOpen,
  onClose,
  initialData,
  beekeeperId,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateJobDTO>();
  const [postProcessingForm] = Form.useForm<PostProcessingDTO>();

  const create = async (data: CreateJobDTO) => {
    try {
      setLoading(true);
      await JobsService.create(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("create Jobs", error);
    } finally {
      setLoading(false);
    }
  };

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
    const data = await form.validateFields();
    const postProcessingValue = await postProcessingForm.validateFields();

    const formValue = {
      ...data,
      weight: data.weight,
    };

    if (validateFormIsEmpty(postProcessingValue)) {
      const postProcessing = {
        ...postProcessingValue,
        postProcessingWeight: postProcessingValue.postProcessingWeight!!,
        postProcessingRevenue: postProcessingValue.postProcessingRevenue!!,
        waste: postProcessingValue.waste!!,
      };

      formValue.postProcessing = postProcessing;
    }

    if (initialData?.id) update(initialData.id, formValue);
    else create(formValue);
    closeModal();
  };

  const closeModal = () => {
    form.resetFields();
    postProcessingForm.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      const formValue: CreateJobDTO = {
        ...initialData,
        weight: initialData.weight!!,
        beekeeperId: initialData.beekeeper?.id!!,
        startAt: dayjs(initialData.startAt!!),
      };

      const postProcessingValue: PostProcessingDTO = {
        postProcessingBales: initialData?.postProcessingBales!!,
        postProcessingWeight: initialData?.postProcessingWeight!!,
        postProcessingRevenue: initialData?.postProcessingRevenue!!,
        waste: initialData?.waste!!,
      };

      postProcessingForm.setFieldsValue(postProcessingValue);
      form.setFieldsValue(formValue);
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (!beekeeperId) return;
    form.setFieldsValue({ beekeeperId: beekeeperId });
  }, [beekeeperId]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Serviço`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={1000}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <JobForm form={form} />
        <Typography.Title level={5}>
          Pós-processamento{" "}
          <span className="text-sm font-normal">(Opcional)</span>
        </Typography.Title>
        <PostProcessingForm form={postProcessingForm} />
      </Flex>
    </Modal>
  );
};
