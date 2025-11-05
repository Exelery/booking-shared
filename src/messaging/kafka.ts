import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaConfig } from '../config/base.js';

export function createKafkaClient(config: KafkaConfig): Kafka {
  return new Kafka({
    clientId: config.clientId,
    brokers: config.broker,
  });
}

export function createProducer(kafka: Kafka): Producer {
  return kafka.producer();
}

export function createConsumer(kafka: Kafka, groupId: string): Consumer {
  return kafka.consumer({ groupId });
}
