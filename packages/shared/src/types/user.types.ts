import { z } from 'zod';
import { Timestamped, Status } from './common.types';

// 用户角色
export type UserRole = 'admin' | 'user' | 'premium' | 'trial';

// 用户状态
export type UserStatus = Status | 'verified' | 'unverified' | 'suspended';

// 用户信息
export interface User extends Timestamped {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
}

// 用户偏好设置
export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    dataSharing: boolean;
  };
}

// 用户会话
export interface UserSession extends Timestamped {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
}

// 用户认证
export interface UserAuth {
  userId: string;
  passwordHash: string;
  salt: string;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}

// Zod schemas
export const UserRoleSchema = z.enum(['admin', 'user', 'premium', 'trial']);

export const UserStatusSchema = z.enum([
  'active', 'inactive', 'pending', 'completed', 'failed', 
  'verified', 'unverified', 'suspended'
]);

export const UserPreferencesSchema = z.object({
  language: z.string().default('zh-CN'),
  timezone: z.string().default('Asia/Shanghai'),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    sms: z.boolean().default(false),
  }),
  theme: z.enum(['light', 'dark', 'auto']).default('auto'),
  privacy: z.object({
    profileVisibility: z.enum(['public', 'private', 'friends']).default('private'),
    dataSharing: z.boolean().default(false),
  }),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().url().optional(),
  role: UserRoleSchema,
  status: UserStatusSchema,
  emailVerified: z.boolean().default(false),
  lastLoginAt: z.date().optional(),
  preferences: UserPreferencesSchema.optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
}); 