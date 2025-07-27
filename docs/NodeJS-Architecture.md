# Alissa Agent Service - Node.js 基建版本设计文档

## 1. 系统架构概览

### 1.1 整体架构

```bash
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API Gateway                                    │
│                    (Kong/Nginx + 负载均衡)                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
            │   User API   │ │ Question API│ │ Interview API│
            │   (Go)       │ │   (Go)      │ │   (Go)      │
            └──────────────┘ └─────────────┘ └─────────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                    ┌───────────────▼───────────────┐
                    │        Agent Service          │
                    │      (Node.js + TS)           │
                    │  ┌─────────────────────────┐   │
                    │  │   Agent Orchestrator    │   │
                    │  │   - Interview Agent     │   │
                    │  │   - Study Plan Agent    │   │
                    │  │   - Practice Agent      │   │
                    │  │   - Resume Agent        │   │
                    │  └─────────────────────────┘   │
                    └────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
            ┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
            │    MySQL     │ │    Kafka    │ │   Qdrant    │
            │   (主数据库)   │ │  (消息队列)  │ │ (向量数据库) │
            └──────────────┘ └─────────────┘ └─────────────┘
```

### 1.2 服务职责划分

#### Agent Service (Node.js)
- **核心职责**: AI Agent编排和执行
- **主要功能**: 
  - 多Provider LLM调用管理
  - 多Agent类型编排
  - 智能对话和任务执行
  - 知识记忆管理
  - 向量检索和语义理解

#### 业务服务 (Go)
- **User Service**: 用户管理、认证授权
- **Question Service**: 题库管理、题目CRUD
- **Interview Service**: 面试流程管理
- **Study Service**: 学习计划管理
- **Practice Service**: 刷题记录管理
- **Resume Service**: 简历管理

## 2. 数据流设计

### 2.1 请求数据流
```
1. 客户端请求 → API Gateway
2. API Gateway → 对应业务服务 (Go)
3. 业务服务 → Agent Service (gRPC/HTTP)
4. Agent Service → LLM Provider
5. Agent Service → 向量数据库/知识库
6. Agent Service → 业务服务 (返回结果)
7. 业务服务 → 客户端
```

### 2.2 异步数据流

```bash
1. 业务服务 → Kafka (事件发布)
2. Kafka → Agent Service (事件消费)
3. Agent Service → 处理事件
4. Agent Service → Kafka (结果发布)
5. Kafka → 业务服务 (结果消费)
```

### 2.3 具体场景数据流

#### 面试场景
```
1. 用户发起面试请求 → Interview Service (Go)
2. Interview Service → Agent Service (创建面试Agent)
3. Agent Service → LLM Provider (生成面试问题)
4. Agent Service → Qdrant (检索相关知识)
5. Agent Service → Interview Service (返回面试问题)
6. 用户回答 → Interview Service
7. Interview Service → Agent Service (评估答案)
8. Agent Service → LLM Provider (分析答案)
9. Agent Service → Interview Service (返回评估结果)
```

#### 学习计划场景
```
1. 用户请求学习计划 → Study Service (Go)
2. Study Service → Agent Service (创建计划Agent)
3. Agent Service → Qdrant (检索用户历史)
4. Agent Service → LLM Provider (生成个性化计划)
5. Agent Service → Study Service (返回计划)
6. Study Service → Kafka (计划创建事件)
7. Kafka → Agent Service (后续跟进任务)
```

## 3. Monorepo目录结构

```bash
alissa-agent/
├── apps/                          # 应用层
│   ├── agent-service/             # Agent核心服务
│   │   ├── src/
│   │   │   ├── main.ts           # 服务入口
│   │   │   ├── app.ts            # 应用配置
│   │   │   ├── api/              # API层
│   │   │   │   ├── v1/
│   │   │   │   │   ├── agent.controller.ts
│   │   │   │   │   ├── llm.controller.ts
│   │   │   │   │   └── health.controller.ts
│   │   │   │   ├── middleware/
│   │   │   │   │   ├── auth.middleware.ts
│   │   │   │   │   ├── rate-limit.middleware.ts
│   │   │   │   │   └── error.middleware.ts
│   │   │   │   └── grpc/         # gRPC服务
│   │   │   │       └── agent.service.ts
│   │   │   ├── core/             # 核心层
│   │   │   │   ├── llm/          # LLM管理
│   │   │   │   │   ├── provider-manager.ts
│   │   │   │   │   ├── circuit-breaker.ts
│   │   │   │   │   └── providers/
│   │   │   │   │       ├── base.provider.ts
│   │   │   │   │       ├── openai.provider.ts
│   │   │   │   │       ├── anthropic.provider.ts
│   │   │   │   │       └── moonshot.provider.ts
│   │   │   │   ├── agents/       # Agent层
│   │   │   │   │   ├── base/
│   │   │   │   │   │   ├── base-agent.ts
│   │   │   │   │   │   ├── agent-state.ts
│   │   │   │   │   │   └── agent-context.ts
│   │   │   │   │   ├── implementations/
│   │   │   │   │   │   ├── interview-agent.ts
│   │   │   │   │   │   ├── study-plan-agent.ts
│   │   │   │   │   │   ├── practice-agent.ts
│   │   │   │   │   │   └── resume-agent.ts
│   │   │   │   │   ├── orchestrator.ts
│   │   │   │   │   └── registry.ts
│   │   │   │   ├── memory/       # 记忆管理
│   │   │   │   │   ├── memory-manager.ts
│   │   │   │   │   ├── vector-store.ts
│   │   │   │   │   └── knowledge-graph.ts
│   │   │   │   └── embedding/    # 嵌入服务
│   │   │   │       └── embedding.service.ts
│   │   │   ├── services/         # 服务层
│   │   │   │   ├── agent.service.ts
│   │   │   │   ├── llm.service.ts
│   │   │   │   └── memory.service.ts
│   │   │   ├── config/           # 配置管理
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── llm.config.ts
│   │   │   │   └── database.config.ts
│   │   │   ├── utils/            # 工具函数
│   │   │   │   ├── validators/
│   │   │   │   ├── helpers/
│   │   │   │   └── constants.ts
│   │   │   └── types/            # 类型定义
│   │   │       ├── agent.types.ts
│   │   │       ├── llm.types.ts
│   │   │       └── index.ts
│   │   ├── tests/                # 测试
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── e2e/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── vitest.config.ts
│   └── admin-dashboard/          # 管理后台 (可选)
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── packages/                     # 共享包
│   ├── shared-types/             # 共享类型定义
│   │   ├── src/
│   │   │   ├── agent.types.ts
│   │   │   ├── llm.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared-utils/             # 共享工具函数
│   │   ├── src/
│   │   │   ├── validators/
│   │   │   ├── helpers/
│   │   │   ├── constants.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── database-client/          # 数据库客户端
│   │   ├── src/
│   │   │   ├── mysql.client.ts
│   │   │   ├── redis.client.ts
│   │   │   └── qdrant.client.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── kafka-client/             # Kafka客户端
│       ├── src/
│       │   ├── producer.ts
│       │   ├── consumer.ts
│       │   └── types.ts
│       ├── package.json
│       └── tsconfig.json
├── proto/                        # gRPC协议定义
│   ├── agent.proto
│   ├── llm.proto
│   └── common.proto
├── prisma/                       # 数据库Schema
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── docker/                       # Docker配置
│   ├── agent-service/
│   │   └── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
├── k8s/                          # Kubernetes配置
│   ├── agent-service/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── mysql/
│   ├── kafka/
│   └── qdrant/
├── scripts/                      # 脚本
│   ├── setup.sh
│   ├── migrate.sh
│   └── deploy.sh
├── test/                         # 集成测试
│   ├── fixtures/
│   ├── helpers/
│   └── scenarios/
├── docs/                         # 文档
│   ├── api/
│   ├── deployment/
│   └── development/
├── .github/                      # CI/CD
│   └── workflows/
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── vitest.config.ts
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 4. 核心组件设计

### 4.1 Provider管理器
- **多Provider支持**: OpenAI、Anthropic、Moonshot等
- **负载均衡**: 根据成本、性能、可用性智能选择
- **熔断器**: 防止单个Provider故障影响整体服务
- **重试机制**: 自动重试失败的请求

### 4.2 Agent编排器
- **Agent注册表**: 动态注册和管理不同类型的Agent
- **上下文管理**: 维护Agent执行上下文和状态
- **并发控制**: 管理多个Agent的并发执行
- **资源调度**: 智能分配计算资源

### 4.3 记忆管理系统
- **向量存储**: 使用Qdrant存储用户记忆向量
- **知识图谱**: 构建用户知识关联网络
- **记忆检索**: 基于语义相似性检索相关记忆
- **记忆更新**: 实时更新和优化用户记忆

### 4.4 消息队列集成
- **事件驱动**: 通过Kafka实现服务间解耦
- **异步处理**: 处理耗时的AI任务
- **重试机制**: 确保消息可靠传递
- **监控告警**: 监控队列状态和处理延迟

## 5. 部署架构

### 5.1 开发环境
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Agent       │ │ MySQL       │ │ Kafka       │
│ Service     │ │ (本地/容器)  │ │ (本地/容器)  │
│ (Node.js)   │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘
       │               │               │
       └───────────────┼───────────────┘
                       │
              ┌────────▼────────┐
              │    Qdrant       │
              │   (容器)        │
              └─────────────────┘
```

### 5.2 生产环境
```
<code_block_to_apply_changes_from>
```

## 6. 监控和可观测性

### 6.1 指标监控
- **Agent执行指标**: 成功率、响应时间、错误率
- **LLM调用指标**: 各Provider的使用情况、成本统计
- **系统资源指标**: CPU、内存、网络使用情况
- **业务指标**: 用户活跃度、Agent使用频率

### 6.2 日志系统
- **结构化日志**: 使用JSON格式记录关键事件
- **分布式追踪**: 追踪请求在服务间的流转
- **错误监控**: 实时监控和告警系统错误

### 6.3 告警机制
- **服务健康检查**: 定期检查各服务状态
- **性能告警**: 响应时间超过阈值时告警
- **错误率告警**: 错误率超过阈值时告警

这个架构设计将Agent Service作为核心AI服务，专注于Agent编排和LLM调用，与其他Go业务服务通过gRPC和Kafka进行协作，实现了服务间的解耦和可扩展性。

