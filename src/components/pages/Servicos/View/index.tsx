import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { JobDescription } from "@/components/molecules/Descriptions/JobDescription";
import { PostProcessingDescription } from "@/components/molecules/Descriptions/PostProcessingDescription";
import { CreateJobsModal } from "@/components/molecules/modais/CreateJobsModal";
import { JobsService } from "@/services/JobsService/service";
import { Job } from "@/types/entitysType";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";

export const ViewJobPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<Job>();
  const [canEdit, setCanEdit] = useState(false);

  const { id } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await JobsService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [ViewJobPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const reload = async () => {
    if (!id) return;
    await fetchResource(id);
  };

  useEffect(() => {
    if (id) fetchResource(id);
  }, [id]);

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <JobDescription
            job={resource}
            title={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>Serviço</Typography.Title>
                <Button
                  onClick={() => setCanEdit(true)}
                  className="flex items-center gap-1"
                  type="text"
                >
                  <AiFillEdit />
                  Editar
                </Button>
              </Flex>
            }
          />
        </Card>

        {resource?.postProcessingResidue && (
          <Card>
            <PostProcessingDescription
              postProcessing={{
                postProcessingWeight: resource.postProcessingWeight,
                postProcessingRevenue: resource.postProcessingRevenue,
                postProcessingDelivered: resource.postProcessingDelivered,
                postProcessingResidue: resource.postProcessingResidue,
              }}
            />
          </Card>
        )}
      </Flex>

      <CreateJobsModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
