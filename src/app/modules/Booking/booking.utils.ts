import { TTimeSlot } from './booking.interface';

export const convertTimeToHours = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours + minutes / 60;
};

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
