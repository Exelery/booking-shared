# @booking/shared

Shared library for booking platform microservices.

## Installation

### GitHub Packages

1. Создайте `.npmrc` файл в вашем проекте:

```
@booking:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Создайте GitHub Personal Access Token с правами `read:packages`

3. Установите пакет:

```bash
npm install @booking/shared
```

### Локальная разработка

```bash
npm install ../booking-shared
```

## Использование

### Конфигурация

```typescript
import { createBaseConfig } from '@booking/shared';

const config = createBaseConfig({
  kafka: {
    clientId: 'my-service',
    consumerGroupId: 'my-service-group',
  },
});
```

### Database (Prisma)

```typescript
import { getPrisma } from '@booking/shared';
import { config } from './config/app';

const prisma = getPrisma({
  database: config.database,
});
```

### Kafka

```typescript
import { 
  createKafkaClient, 
  createProducer, 
  createConsumer,
  connectProducer,
  connectConsumer 
} from '@booking/shared';
import { config } from './config/app';

const kafka = createKafkaClient(config.kafka);
const producer = createProducer(kafka);
const consumer = createConsumer(kafka, config.kafka.consumerGroupId!);

await connectProducer(producer);
await connectConsumer(consumer);
```

### Types

```typescript
import { BookingStatus, Booking, CreateBookingDto } from '@booking/shared';
```

### Events

```typescript
import { KAFKA_TOPICS, BookingCreatedEvent } from '@booking/shared';
```

## Development

```bash
npm install
npm run build
```

## Publishing

```bash
npm version patch|minor|major
git push --follow-tags
npm publish
```

## Структура

- `config/` - Базовая конфигурация
- `database/` - Prisma клиент
- `messaging/` - Kafka клиенты
- `types/` - Общие TypeScript типы
- `events/` - Kafka события и топики

