import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient | null = null;

export interface PrismaConfig {
  database?: {
    url: string;
  };
  log?: ('query' | 'error' | 'warn' | 'info')[];
}

export function getPrisma(config?: PrismaConfig): PrismaClient {
  if (!prismaInstance) {
    const logLevel = config?.log 
      ? config.log
      : process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'];

    prismaInstance = new PrismaClient({
      datasources: config?.database ? {
        db: {
          url: config.database.url,
        },
      } : undefined,
      log: logLevel,
    });
  }
  return prismaInstance;
}

export function disconnectPrisma(): Promise<void> {
  if (prismaInstance) {
    return prismaInstance.$disconnect();
  }
  return Promise.resolve();
}

export async function waitForDb(prisma: PrismaClient, maxRetries = 30, delay = 2000): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connected');
      return;
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(`Waiting for database... (${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

