import { Button, Card, Flex, Radio, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { JobsTable } from "@/components/molecules/tables/JobsTable";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { Beekeeper, Job } from "@/types/entitysType";
import { BasePagination } from "@/components/atoms/BasePagination";
import { JobsService } from "@/services/JobsService/service";
import { CreateJobsModal } from "@/components/molecules/modais/CreateJobsModal";
import { useNavigate } from "react-router-dom";
import { PostProcessingModal } from "@/components/molecules/modais/PostProcessingModal";

export const ServicosPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Job>>();
  const [jobStatus, setJobStatus] = useState<string>("ALL");
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createJobModal, setCreateJobModal] = useState<boolean>(false);
  const [selectedEditJob, setSelectedEditJob] = useState<Job>();
  const [selectedProcess, setSelectedProcess] = useState<Job>();

  const navigate = useNavigate();

  const handleView = (job: Job) => {
    navigate(`/servico/${job.id}`);
  };

  const handleBeekeeperView = (beekeeper: Beekeeper) => {
    navigate(`/apicultor/${beekeeper.id}`);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await JobsService.getPage(page, {
        status: jobStatus,
      });

      setResource(data);
    } catch (error) {
      console.error("fetchJobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, jobStatus]);

  return (
    <Card>
      <Flex gap={20} vertical className="overflow-hidden relative">
        <Flex justify="space-between">
          <Typography.Title level={4}>Serviços</Typography.Title>
          <Flex gap={8}>
            <Radio.Group
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="ALL">Todos</Radio.Button>
              <Radio.Button value="IN_PROGRESS">Em progresso</Radio.Button>
              <Radio.Button value="CONCLUDED">Concluidos</Radio.Button>
              <Radio.Button value="CANCELED">Cancelados</Radio.Button>
            </Radio.Group>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateJobModal(true)}
            >
              Novo Serviço
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <JobsTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onViewBeekeeper={handleBeekeeperView}
            onEdit={(manager) => setSelectedEditJob(manager)}
            onProcess={(job) => setSelectedProcess(job)}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateJobsModal
        isOpen={createJobModal || !!selectedEditJob}
        onClose={() => {
          setCreateJobModal(false);
          setSelectedEditJob(undefined);
        }}
        initialData={selectedEditJob}
        reload={fetchJobs}
      />

      <PostProcessingModal
        isOpen={!!selectedProcess}
        initialData={selectedProcess}
        reload={fetchJobs}
        onClose={() => {
          setSelectedProcess(undefined);
        }}
      />
    </Card>
  );
};
