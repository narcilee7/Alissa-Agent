import { z } from 'zod';

// 邮箱验证
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 手机号验证（中国）
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// 密码强度验证
export const isStrongPassword = (password: string): boolean => {
  // 至少8位，包含大小写字母、数字和特殊字符
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// URL验证
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// UUID验证
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// 身份证号验证（中国）
export const isValidIdCard = (idCard: string): boolean => {
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return idCardRegex.test(idCard);
};

// 通用验证器
export const createValidator = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown): { success: true; data: T } | { success: false; error: string } => {
    try {
      const result = schema.parse(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0]?.message || '验证失败' };
      }
      return { success: false, error: '验证失败' };
    }
  };
};

// 异步验证器
export const createAsyncValidator = <T>(schema: z.ZodSchema<T>) => {
  return async (data: unknown): Promise<{ success: true; data: T } | { success: false; error: string }> => {
    try {
      const result = await schema.parseAsync(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0]?.message || '验证失败' };
      }
      return { success: false, error: '验证失败' };
    }
  };
}; 