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
  const kafkaBrokerEnv = process.env.KAFKA_BROKER;
  const defaultBrokers = kafkaBrokerEnv 
    ? kafkaBrokerEnv.split(',').map(b => b.trim()).filter(b => b.length > 0)
    : ['kafka:9092'];
  
  const defaultKafkaConfig = {
    broker: defaultBrokers.length > 0 ? defaultBrokers : ['kafka:9092'],
    clientId: 'default-service',
  };

  const finalBroker = overrides.kafka?.broker && Array.isArray(overrides.kafka.broker) && overrides.kafka.broker.length > 0
    ? overrides.kafka.broker
    : defaultKafkaConfig.broker;

  return {
    nodeEnv: overrides.nodeEnv || process.env.NODE_ENV || 'development',
    database: {
      url: overrides.database?.url || process.env.DATABASE_URL || '',
    },
    kafka: {
      broker: finalBroker,
      clientId: overrides.kafka?.clientId || defaultKafkaConfig.clientId,
      consumerGroupId: overrides.kafka?.consumerGroupId,
    },
  };
}

