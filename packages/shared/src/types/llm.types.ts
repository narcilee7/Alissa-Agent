import { z } from 'zod';

// LLM Provider类型
export type LLMProvider = 'openai' | 'anthropic' | 'moonshot' | 'qwen' | 'deepseek';

// 模型类型
export type ModelType = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3' | 'claude-2' | 'moonshot-v1-8k' | 'qwen-turbo' | 'deepseek-chat';

// 消息角色
export type MessageRole = 'system' | 'user' | 'assistant' | 'function';

// LLM消息
export interface LLMMessage {
  role: MessageRole;
  content: string;
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  };
}

// LLM请求配置
export interface LLMRequestConfig {
  model: ModelType;
  provider: LLMProvider;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
  stream?: boolean;
}

// LLM响应
export interface LLMResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: ModelType;
  provider: LLMProvider;
  finishReason?: string;
  metadata?: Record<string, any>;
}

// LLM错误
export interface LLMError {
  code: string;
  message: string;
  provider: LLMProvider;
  model?: ModelType;
  retryable: boolean;
}

// Provider配置
export interface ProviderConfig {
  name: LLMProvider;
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  enabled: boolean;
}

// Zod schemas
export const LLMProviderSchema = z.enum(['openai', 'anthropic', 'moonshot', 'qwen', 'deepseek']);

export const ModelTypeSchema = z.enum([
  'gpt-4', 'gpt-3.5-turbo', 'claude-3', 'claude-2', 
  'moonshot-v1-8k', 'qwen-turbo', 'deepseek-chat'
]);

export const MessageRoleSchema = z.enum(['system', 'user', 'assistant', 'function']);

export const LLMMessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string(),
  name: z.string().optional(),
  function_call: z.object({
    name: z.string(),
    arguments: z.string(),
  }).optional(),
});

export const LLMRequestConfigSchema = z.object({
  model: ModelTypeSchema,
  provider: LLMProviderSchema,
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().positive().optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stop: z.array(z.string()).optional(),
  stream: z.boolean().optional(),
}); 