// 应用常量
export const APP_NAME = 'Alissa Agent';
export const APP_VERSION = '0.0.1';
export const APP_DESCRIPTION = 'AI Agent Orchestration Platform';

// 环境变量
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_TEST = NODE_ENV === 'test';

// AI URI
export const MOONSHOT_URI = 'https://api.moonshot.ai/v1';
export const QWEN_URI = 'https://api.qwen.ai/v1';
export const DEEPSEEK_URI = 'https://api.deepseek.ai/v1';

// 服务端口
export const DEFAULT_PORT = 3000;
export const AGENT_SERVICE_PORT = process.env.AGENT_SERVICE_PORT || 3001;
export const WEBSOCKET_SERVICE_PORT = process.env.WEBSOCKET_SERVICE_PORT || 3002;
export const WORKER_SERVICE_PORT = process.env.WORKER_SERVICE_PORT || 3003;

// 数据库配置
export const DATABASE_URL = process.env.DATABASE_URL || 'mysql://localhost:3306/alissa_agent';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';

// Kafka配置
export const KAFKA_BROKERS = process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'];
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'alissa-agent';

// 日志配置
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const LOG_FORMAT = process.env.LOG_FORMAT || 'json';

// 安全配置
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const BCRYPT_ROUNDS = 12;

// 限流配置
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15分钟
export const RATE_LIMIT_MAX_REQUESTS = 100; // 每个窗口最大请求数

// 缓存配置
export const CACHE_TTL = 60 * 60; // 1小时
export const SESSION_TTL = 24 * 60 * 60; // 24小时 