import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFaciityIntoDB = async (facility: TFacility) => {
  const result = await Facility.create(facility);
  return result;
};

const getAllFaciitiesFromDB = async () => {
  const result = await Facility.find();
  return result;
};

const updateFaciityIntoDB = async (id: string, payload: Partial<TFacility>) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

export const FacilityServices = {
  createFaciityIntoDB,
  getAllFaciitiesFromDB,
  updateFaciityIntoDB,
  deleteFacilityFromDB,
};
