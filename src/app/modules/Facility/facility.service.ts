import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

// create a new facility
const createFaciityIntoDB = async (facility: TFacility) => {
  const result = await Facility.create(facility);
  return result;
};

// getting all the facility
const getAllFaciitiesFromDB = async () => {
  const result = await Facility.find({ isDeleted: { $ne: true } });
  return result;
};
// getting  facility by ID
const getSingleFaciitiesById = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};

// updating the facility
const updateFaciityIntoDB = async (id: string, payload: Partial<TFacility>) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// deleting the facility
const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return result;
};

export const FacilityServices = {
  createFaciityIntoDB,
  getAllFaciitiesFromDB,
  getSingleFaciitiesById,
  updateFaciityIntoDB,
  deleteFacilityFromDB,
};
