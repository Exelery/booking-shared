import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaConfig } from '../config/base';

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

