import { z } from 'zod';
import { Status, Timestamped } from './common.types';

// Agent类型
export type AgentType = 'interview' | 'study-plan' | 'practice' | 'resume';

// Agent状态
export type AgentStatus = Status | 'running' | 'stopped' | 'error';

// Agent配置
export interface AgentConfig {
  name: string;
  type: AgentType;
  description?: string;
  settings: Record<string, any>;
  enabled: boolean;
}

// Agent实例
export interface AgentInstance extends Timestamped {
  id: string;
  config: AgentConfig;
  status: AgentStatus;
  currentTask?: string;
  metadata?: Record<string, any>;
}

// Agent消息
export interface AgentMessage {
  id: string;
  agentId: string;
  type: 'input' | 'output' | 'error' | 'status';
  content: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

// Agent任务
export interface AgentTask {
  id: string;
  agentId: string;
  type: string;
  status: Status;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
}

// Zod schemas
export const AgentTypeSchema = z.enum(['interview', 'study-plan', 'practice', 'resume']);

export const AgentConfigSchema = z.object({
  name: z.string().min(1),
  type: AgentTypeSchema,
  description: z.string().optional(),
  settings: z.record(z.any()),
  enabled: z.boolean().default(true),
});

export const AgentInstanceSchema = z.object({
  id: z.string(),
  config: AgentConfigSchema,
  status: z.enum(['active', 'inactive', 'pending', 'completed', 'failed', 'running', 'stopped', 'error']),
  currentTask: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}); 