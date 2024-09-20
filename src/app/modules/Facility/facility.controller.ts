import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';

// creating a new facility
const createFacility = catchAsync(async (req, res) => {
  const facilityData = req.body;

  const result = await FacilityServices.createFaciityIntoDB(facilityData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

// getting the facilities
const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFaciitiesFromDB();

  // if no data found
  if (result.length == 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Available Slot Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

// delete facility
const getSingleFacility = catchAsync(async (req, res) => {
  // getting the facility by id from params
  const { id } = req.params;
  const result = await FacilityServices.getSingleFaciitiesById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility fetched successfully',
    data: result,
  });
});

// update facility
const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.updateFaciityIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});

// delete facility
const deleteFacility = catchAsync(async (req, res) => {
  // getting the facility by id from params
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  getAllFaculties,
  getSingleFacility,
  updateFacility,
  deleteFacility,
};
