import { createHash, randomBytes, scrypt, timingSafeEqual } from 'crypto';

// 生成随机盐
export const generateSalt = (length: number = 16): string => {
  return randomBytes(length).toString('hex');
};

// 哈希密码
export const hashPassword = async (password: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey.toString('hex'));
    });
  });
};

// 验证密码
export const verifyPassword = async (password: string, hash: string, salt: string): Promise<boolean> => {
  const hashedPassword = await hashPassword(password, salt);
  return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(hashedPassword, 'hex'));
};

// MD5哈希
export const md5 = (data: string): string => {
  return createHash('md5').update(data).digest('hex');
};

// SHA256哈希
export const sha256 = (data: string): string => {
  return createHash('sha256').update(data).digest('hex');
};

// SHA512哈希
export const sha512 = (data: string): string => {
  return createHash('sha512').update(data).digest('hex');
};

// 生成随机字符串
export const generateRandomString = (length: number = 32): string => {
  return randomBytes(length).toString('base64url');
};

// 生成API密钥
export const generateApiKey = (): string => {
  return `ak_${generateRandomString(32)}`;
};

// 生成访问令牌
export const generateAccessToken = (): string => {
  return `at_${generateRandomString(48)}`;
};

// 生成刷新令牌
export const generateRefreshToken = (): string => {
  return `rt_${generateRandomString(64)}`;
}; 