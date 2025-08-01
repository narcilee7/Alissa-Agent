// 错误代码
export const ERROR_CODES = {
  // 通用错误
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // 数据库错误
  DATABASE_ERROR: 'DATABASE_ERROR',
  DATABASE_CONNECTION_ERROR: 'DATABASE_CONNECTION_ERROR',
  DATABASE_QUERY_ERROR: 'DATABASE_QUERY_ERROR',
  
  // 认证错误
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  
  // LLM错误
  LLM_ERROR: 'LLM_ERROR',
  LLM_PROVIDER_ERROR: 'LLM_PROVIDER_ERROR',
  LLM_RATE_LIMIT: 'LLM_RATE_LIMIT',
  LLM_QUOTA_EXCEEDED: 'LLM_QUOTA_EXCEEDED',
  
  // Agent错误
  AGENT_ERROR: 'AGENT_ERROR',
  AGENT_NOT_FOUND: 'AGENT_NOT_FOUND',
  AGENT_ALREADY_RUNNING: 'AGENT_ALREADY_RUNNING',
  AGENT_TASK_FAILED: 'AGENT_TASK_FAILED',
  
  // 外部服务错误
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  EXTERNAL_SERVICE_TIMEOUT: 'EXTERNAL_SERVICE_TIMEOUT',
  EXTERNAL_SERVICE_UNAVAILABLE: 'EXTERNAL_SERVICE_UNAVAILABLE',
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  [ERROR_CODES.UNKNOWN_ERROR]: '发生未知错误',
  [ERROR_CODES.VALIDATION_ERROR]: '数据验证失败',
  [ERROR_CODES.NOT_FOUND]: '资源未找到',
  [ERROR_CODES.UNAUTHORIZED]: '未授权访问',
  [ERROR_CODES.FORBIDDEN]: '禁止访问',
  [ERROR_CODES.CONFLICT]: '资源冲突',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: '请求频率超限',
  
  [ERROR_CODES.DATABASE_ERROR]: '数据库错误',
  [ERROR_CODES.DATABASE_CONNECTION_ERROR]: '数据库连接失败',
  [ERROR_CODES.DATABASE_QUERY_ERROR]: '数据库查询失败',
  
  [ERROR_CODES.INVALID_CREDENTIALS]: '用户名或密码错误',
  [ERROR_CODES.TOKEN_EXPIRED]: '令牌已过期',
  [ERROR_CODES.TOKEN_INVALID]: '令牌无效',
  [ERROR_CODES.ACCOUNT_LOCKED]: '账户已被锁定',
  
  [ERROR_CODES.LLM_ERROR]: 'LLM服务错误',
  [ERROR_CODES.LLM_PROVIDER_ERROR]: 'LLM提供商错误',
  [ERROR_CODES.LLM_RATE_LIMIT]: 'LLM请求频率超限',
  [ERROR_CODES.LLM_QUOTA_EXCEEDED]: 'LLM配额已用完',
  
  [ERROR_CODES.AGENT_ERROR]: 'Agent错误',
  [ERROR_CODES.AGENT_NOT_FOUND]: 'Agent未找到',
  [ERROR_CODES.AGENT_ALREADY_RUNNING]: 'Agent已在运行',
  [ERROR_CODES.AGENT_TASK_FAILED]: 'Agent任务失败',
  
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: '外部服务错误',
  [ERROR_CODES.EXTERNAL_SERVICE_TIMEOUT]: '外部服务超时',
  [ERROR_CODES.EXTERNAL_SERVICE_UNAVAILABLE]: '外部服务不可用',
} as const;

// HTTP状态码映射
export const ERROR_HTTP_STATUS = {
  [ERROR_CODES.UNKNOWN_ERROR]: 500,
  [ERROR_CODES.VALIDATION_ERROR]: 422,
  [ERROR_CODES.NOT_FOUND]: 404,
  [ERROR_CODES.UNAUTHORIZED]: 401,
  [ERROR_CODES.FORBIDDEN]: 403,
  [ERROR_CODES.CONFLICT]: 409,
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 429,
  
  [ERROR_CODES.DATABASE_ERROR]: 500,
  [ERROR_CODES.DATABASE_CONNECTION_ERROR]: 503,
  [ERROR_CODES.DATABASE_QUERY_ERROR]: 500,
  
  [ERROR_CODES.INVALID_CREDENTIALS]: 401,
  [ERROR_CODES.TOKEN_EXPIRED]: 401,
  [ERROR_CODES.TOKEN_INVALID]: 401,
  [ERROR_CODES.ACCOUNT_LOCKED]: 423,
  
  [ERROR_CODES.LLM_ERROR]: 500,
  [ERROR_CODES.LLM_PROVIDER_ERROR]: 502,
  [ERROR_CODES.LLM_RATE_LIMIT]: 429,
  [ERROR_CODES.LLM_QUOTA_EXCEEDED]: 429,
  
  [ERROR_CODES.AGENT_ERROR]: 500,
  [ERROR_CODES.AGENT_NOT_FOUND]: 404,
  [ERROR_CODES.AGENT_ALREADY_RUNNING]: 409,
  [ERROR_CODES.AGENT_TASK_FAILED]: 500,
  
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 502,
  [ERROR_CODES.EXTERNAL_SERVICE_TIMEOUT]: 504,
  [ERROR_CODES.EXTERNAL_SERVICE_UNAVAILABLE]: 503,
} as const; 