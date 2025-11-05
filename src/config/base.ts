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
  const defaultKafkaConfig = {
    broker: process.env.KAFKA_BROKER 
      ? process.env.KAFKA_BROKER.split(',')
      : ['kafka:9092'],
    clientId: 'default-service',
  };

  return {
    nodeEnv: overrides.nodeEnv || process.env.NODE_ENV || 'development',
    database: {
      url: overrides.database?.url || process.env.DATABASE_URL || '',
    },
    kafka: {
      broker: overrides.kafka?.broker || defaultKafkaConfig.broker,
      clientId: overrides.kafka?.clientId || defaultKafkaConfig.clientId,
      consumerGroupId: overrides.kafka?.consumerGroupId,
    },
  };
}

