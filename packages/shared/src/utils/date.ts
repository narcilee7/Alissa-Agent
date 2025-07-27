import { format, formatDistance, formatRelative, isValid, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 格式化日期
export const formatDate = (date: Date | string, formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return format(dateObj, formatStr, { locale: zhCN });
};

// 格式化相对时间
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return formatRelative(dateObj, new Date(), { locale: zhCN });
};

// 格式化距离时间
export const formatDistanceTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return formatDistance(dateObj, new Date(), { locale: zhCN, addSuffix: true });
};

// 获取当前时间戳
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

// 获取当前ISO字符串
export const getCurrentISOString = (): string => {
  return new Date().toISOString();
};

// 检查日期是否过期
export const isExpired = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return dateObj < new Date();
};

// 检查日期是否在未来
export const isFuture = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return dateObj > new Date();
};

// 获取日期开始时间
export const getStartOfDay = (date: Date | string): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
};

// 获取日期结束时间
export const getEndOfDay = (date: Date | string): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59, 999);
};

// 计算两个日期之间的天数
export const getDaysBetween = (startDate: Date | string, endDate: Date | string): number => {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  if (!isValid(start) || !isValid(end)) {
    throw new Error('Invalid date');
  }
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// 添加天数
export const addDays = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
};

// 添加小时
export const addHours = (date: Date | string, hours: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  
  const result = new Date(dateObj);
  result.setHours(result.getHours() + hours);
  return result;
};

// 添加分钟
export const addMinutes = (date: Date | string, minutes: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }
  
  const result = new Date(dateObj);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}; 