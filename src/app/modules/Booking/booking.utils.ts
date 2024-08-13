import { TTimeSlot } from './booking.interface';

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
