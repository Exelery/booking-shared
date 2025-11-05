import { BookingStatus } from '../types/booking.js';

export const KAFKA_TOPICS = {
  BOOKING_CREATED: 'booking.created',
} as const;

export interface BookingCreatedEvent {
  bookingId: string;
  restaurantId: string;
  date: string;
  time: string;
  guestCount: number;
  status: BookingStatus;
  timestamp: string;
}

