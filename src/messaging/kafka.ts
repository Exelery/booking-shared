import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaConfig } from '../config/base.js';

export function createKafkaClient(config: KafkaConfig): Kafka {
  if (!config.broker || !Array.isArray(config.broker) || config.broker.length === 0) {
    throw new Error(`Invalid Kafka broker configuration: ${JSON.stringify(config.broker)}. Config: ${JSON.stringify(config)}`);
  }
  
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

export async function connectProducer(producer: Producer): Promise<void> {
  await producer.connect();
}

export async function connectConsumer(consumer: Consumer): Promise<void> {
  await consumer.connect();
}

export async function disconnectProducer(producer: Producer): Promise<void> {
  await producer.disconnect();
}

export async function disconnectConsumer(consumer: Consumer): Promise<void> {
  await consumer.disconnect();
}

