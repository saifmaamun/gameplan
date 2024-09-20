import { TBooking, TTimeSlot } from './booking.interface';

// converting given time into number
export const convertTimeToHours = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};

// retriving the time slots
export const getAvailableTimeSlots = (
  bookedSlots: TTimeSlot[],
  openingTime = '08:00',
  closingTime = '22:00',
): TTimeSlot[] => {
  const slots: TTimeSlot[] = [];
  let lastEndTime = openingTime;

  for (const slot of bookedSlots) {
    if (lastEndTime < slot.startTime) {
      slots.push({ startTime: lastEndTime, endTime: slot.startTime });
    }
    lastEndTime = slot.endTime;
  }

  if (lastEndTime < closingTime) {
    slots.push({ startTime: lastEndTime, endTime: closingTime });
  }

  return slots;
};

// Generate total time slots for a day
export const generateTotalTimeSlots = (): TTimeSlot[] => {
  const slots: TTimeSlot[] = [];
  for (let hour = 9; hour < 21; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
    slots.push({
      startTime: start,
      endTime: end,
    });
  }

  return slots;
};

// Find available slots based on existing bookings
export const findAvailableSlots = (
  totalSlots: TTimeSlot[],
  bookings: TBooking[],
): TTimeSlot[] => {
  // Extract booked time ranges from the bookings

  const bookedTimeRanges = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  // Filter out the slots that overlap with booked time ranges
  const availableSlots = totalSlots.filter((slot) => {
    return !bookedTimeRanges.some(
      (booked) =>
        (slot.startTime >= booked.startTime &&
          slot.startTime < booked.endTime) || // Slot starts during a booked time
        (slot.endTime > booked.startTime && slot.endTime <= booked.endTime), // Slot ends during a booked time
    );
  });

  return availableSlots;
};
