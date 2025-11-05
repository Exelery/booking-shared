export interface DatabaseConfig {
  url: string;
}

export interface KafkaConfig {
  broker: string[];
  clientId: string;
  consumerGroupId?: string;
}

export interface BaseConfig {
  nodeEnv: string;
  database: DatabaseConfig;
  kafka: KafkaConfig;
}

export function createBaseConfig(overrides: Partial<BaseConfig> = {}): BaseConfig {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
      url: process.env.DATABASE_URL || '',
      ...overrides.database,
    },
    kafka: {
      broker: process.env.KAFKA_BROKER 
        ? process.env.KAFKA_BROKER.split(',')
        : ['kafka:9092'],
      clientId: 'default-service',
      ...overrides.kafka,
    },
    ...overrides,
  };
}

