import { Button, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Manager } from "@/types/entitysType";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { ManagerService } from "@/services/managerService/service";
import { ManagerTable } from "@/components/molecules/tables/ManagerTable";
import { BasePagination } from "@/components/atoms/BasePagination";

export const ProdutorPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Manager>>();
  const [status, setStatus] = useState<string>("ACTIVE");
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createManagerModal, setCreateManagerModal] = useState<boolean>(false);
  const [selectedEditManager, setSelectedEditManager] = useState<Manager>();

  const fetchPage = async () => {
    setLoading(true);
    try {
      const { data } = await ManagerService.getPage(page, {
        status,
      });
      console.log("fetchManagers", data);
      setResource(data);
    } catch (error) {
      console.error("fetchManagers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <Flex gap={20} vertical className="overflow-hidden">
      <Flex justify="space-between">
        <Typography.Title level={4}>Gestores</Typography.Title>
        <Flex gap={8}>
          <Radio.Group value={30} onChange={(e) => setStatus(e.target.value)}>
            <Radio.Button value="ACTIVE">Ativos</Radio.Button>
            <Radio.Button value="INACTIVE">Inativos</Radio.Button>
          </Radio.Group>
          <Search
            placeholder="Pesquise um produtor..."
            allowClear
            onSearch={(value) => console.log(value)}
            style={{ width: 304 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            Novo Gestor
          </Button>
        </Flex>
      </Flex>

      <Flex gap={20} vertical>
        <ManagerTable
          dataSource={resource?.content ?? []}
          pagination={false}
          loading={loading}
        />
        <BasePagination page={page} setPage={setPage} pageable={resource} />
      </Flex>
    </Flex>
  );
};
