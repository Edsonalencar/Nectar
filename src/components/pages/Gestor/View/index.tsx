import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { CreateManagerModal } from "@/components/molecules/modais/CreateManagerModal";
import { ManagerService } from "@/services/managerService/service";
import { Manager } from "@/types/entitysType";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

export const ViewManagerPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<Manager>();
  const [canEdit, setCanEdit] = useState(false);

  const { id } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await ManagerService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [ViewManagerPage]", error);
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
          <ProfileWitchEmailDescription
            tittle={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>Gestor</Typography.Title>
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
            data={{
              ...resource?.user?.profile,
              owner: resource?.org,
              email: resource?.user?.auth?.username,
              status: resource?.user?.status,
            }}
          />
        </Card>
      </Flex>

      <CreateManagerModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
