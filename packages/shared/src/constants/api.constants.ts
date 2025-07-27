// API版本
export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

// HTTP状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// HTTP方法
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// Content-Type
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const;

// 请求头
export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
  X_TRACE_ID: 'X-Trace-ID',
  X_API_KEY: 'X-API-Key',
} as const;

// 认证类型
export const AUTH_TYPES = {
  BEARER: 'Bearer',
  API_KEY: 'ApiKey',
  BASIC: 'Basic',
} as const;

// 分页默认值
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 1000,
} as const;

// 排序
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const; 