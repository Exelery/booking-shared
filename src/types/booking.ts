export enum BookingStatus {
  CREATED = 'CREATED',
  CHECKING_AVAILABILITY = 'CHECKING_AVAILABILITY',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED'
}

export interface Booking {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  guestCount: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingDto {
  restaurantId: string;
  date: string;
  time: string;
  guestCount: number;
}

