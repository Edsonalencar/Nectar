import { BasePagination } from "@/components/atoms/BasePagination";
import { InputSelectDate } from "@/components/atoms/Inputs/inputSelectDate";
import { JobsTable } from "@/components/molecules/tables/JobsTable";
import { ItensGraph, MonthlyBoard } from "@/services/dashboarService/dtos";
import { DashboarService } from "@/services/dashboarService/service";
import { Pageable } from "@/types";
import { Beekeeper, Job } from "@/types/entitysType";
import { Card, Col, Flex, Radio, Row, Statistic, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlowGraph = React.lazy(() => import("@/components/molecules/FlowGraph"));

export const DashboardPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Job>>();
  const [resourceGraph, setResourceGraph] = useState<ItensGraph[]>([]);
  const [resourceBoard, setResourceBoard] = useState<MonthlyBoard | null>(null);

  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [jobStatus, setJobStatus] = useState<string>("ALL");

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
      const { data } = await DashboarService.getPage(page, {
        status: jobStatus,
        month: date,
      });
      setResource(data);
    } catch (error) {
      console.error("fetchJobs [DashboardPage]", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyData = async () => {
    setLoading(true);
    try {
      const { data } = await DashboarService.monthlyBoard(date);
      setResourceBoard(data);
    } catch (error) {
      console.error("Erro ao buscar dados mensais [fetchMonthlyData]:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGraphData = async () => {
    setLoading(true);
    try {
      const { data } = await DashboarService.monthlyGraph(date);
      const recivedServices = data.data?.map((item: ItensGraph) => ({
        day: dayjs(item.date).format("DD"),
        value: (item.recivedOfServices ?? 0) / 100,
        date: item.date,
        type: "Recebido",
      }));
      const wasteOfServices = data.data?.map((item: ItensGraph) => ({
        day: dayjs(item.date).format("DD"),
        value: (item.wasteOfServices ?? 0) / 100,
        date: item.date,
        type: "Desperdiçado",
      }));
      const revenueOfServices = data.data?.map((item: ItensGraph) => ({
        day: dayjs(item.date).format("DD"),
        value: (item.revenueOfServices ?? 0) / 100,
        date: item.date,
        type: "Arrecadado",
      }));

      setResourceGraph([
        ...recivedServices,
        ...revenueOfServices,
        ...wasteOfServices,
      ]);
    } catch (error) {
      console.error("fetchGraphData", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
    fetchGraphData();
  }, [date]);

  useEffect(() => {
    fetchJobs();
  }, [page, jobStatus, date]);

  return (
    <Flex gap={20} vertical>
      <InputSelectDate date={date} setDate={setDate} />

      {/* Painel de estatísticas mensais */}
      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 6 }}>
          <Card>
            <Statistic
              title="Serviços em processamento"
              value={resourceBoard?.inProcessingServices || 0}
            />
          </Card>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Card>
            <Statistic
              title="Serviços concluídos"
              value={resourceBoard?.concludeServices || 0}
            />
          </Card>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Card>
            <Statistic
              title="Novos apicultores cadastrados"
              value={resourceBoard?.newBeekeepers || 0}
            />
          </Card>
        </Col>
        <Col span={24} md={{ span: 6 }}>
          <Card>
            <Statistic
              title="Cota de cera"
              value={resourceBoard?.revenue || 0}
              suffix="Kg"
            />
          </Card>
        </Col>
      </Row>

      {/* Gráfico de fluxo de serviço */}
      <Card title="Fluxo de serviço">
        <FlowGraph data={resourceGraph} />
      </Card>

      {/* Histórico de serviços */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <Typography.Title level={5} style={{ margin: 0 }}>
              Histórico
            </Typography.Title>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              Ultimos 10 serviços cadastrados
            </p>
          </div>
        }
      >
        <Flex gap={20} vertical>
          <Flex gap={8} justify="end">
            <Radio.Group
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="ALL">Todos</Radio.Button>
              <Radio.Button value="IN_PROGRESS">Em progresso</Radio.Button>
              <Radio.Button value="CONCLUDED">Concluídos</Radio.Button>
              <Radio.Button value="CANCELED">Cancelados</Radio.Button>
            </Radio.Group>
          </Flex>

          <JobsTable
            onView={handleView}
            onViewBeekeeper={handleBeekeeperView}
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Card>
    </Flex>
  );
};
