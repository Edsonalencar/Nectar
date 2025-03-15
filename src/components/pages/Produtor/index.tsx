import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { ProdutorTable } from "../../molecules/tables/ProdutorTable";
import { Beekeeper } from "@/types/entitysType";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { BeekeepersService } from "@/services/beekeepersService/service";
import { BasePagination } from "@/components/atoms/BasePagination";
import { CreateBeekeeperModal } from "@/components/molecules/modais/CreateBeekeeperModal";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/authTypes";

export const ProdutorPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Beekeeper>>();
  const [status, setStatus] = useState<string>("ACTIVE");
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleView = (manager: Beekeeper) => {
    navigate(`/apicultor/${manager.id}`);
  };

  const handleManagerView = (user: User) => {
    console.log("handleManagerView", user);

    navigate(`/gestor/${user?.id}`);
  };

  const [createBeekeeperModal, setCreateBeekeeperModal] =
    useState<boolean>(false);
  const [selectedEditBeekeeper, setSelectedEditBeekeeper] =
    useState<Beekeeper>();

  const fetchPage = async (name?:string) => {
    setLoading(true);
    try {
      const { data } = await BeekeepersService.getPage(page, {
        status,
        name
      });
      console.log("fetchBeekeeper", data);
      setResource(data);
    } catch (error) {
      console.error("fetchBeekeeper", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (beekeeper: Beekeeper) => {
    setLoading(true);
    try {
      await BeekeepersService.disableBeekeeper(beekeeper.id as string, beekeeper.status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
      fetchPage();
    } catch (error) {
      console.error("handleDisable", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4}>Apicultores</Typography.Title>
          <Flex gap={8}>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="ACTIVE">Ativos</Radio.Button>
              <Radio.Button value="INACTIVE">Inativos</Radio.Button>
            </Radio.Group>
            <Search
              placeholder="Pesquise um produtor..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateBeekeeperModal(true)}
            >
              Novo Apicultor
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <ProdutorTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onEdit={(manager) => setSelectedEditBeekeeper(manager)}
            onDisable={status === "ACTIVE" ? (beekeeper)=> handleChangeStatus(beekeeper) : undefined}
            onEnable={status === "INACTIVE" ? (beekeeper)=> handleChangeStatus(beekeeper) : undefined}
            onVewOwner={handleManagerView}
          />

          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateBeekeeperModal
        isOpen={createBeekeeperModal || !!selectedEditBeekeeper}
        onClose={() => {
          setCreateBeekeeperModal(false);
          setSelectedEditBeekeeper(undefined);
        }}
        initialData={selectedEditBeekeeper}
        reload={fetchPage}
      />
    </Card>
  );
};
