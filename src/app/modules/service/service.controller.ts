/* eslint-disable @typescript-eslint/no-explicit-any */
import { serviceServices } from "./service.service";

import { Service } from "./service.model";
import { handleNoDataResponse } from "../../errors/handleNoData";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";

const createService = catchAsync(async (req, res) => {
  const ServiceData = req.body;
  const result = await serviceServices.createServiceIntoDb(ServiceData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await serviceServices.getSingleServiceFromDB(id);
  if (!result) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});
const getSingleServiceDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await serviceServices.getSingleServiceDetailsFromDB(id);
  if (!result) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const { search, sortOrder = "asc", minDuration, maxDuration } = req.query;

  // Build the query
  const query: any = { isDeleted: false };

  if (search) {
    const searchTerm = search.toString();
    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (minDuration) {
    query.duration = { ...query.duration, $gte: Number(minDuration) };
  }
  if (maxDuration) {
    query.duration = { ...query.duration, $lte: Number(maxDuration) };
  }

  const sort: any = {};
  if (sortOrder === "asc") {
    sort.price = 1;
  } else if (sortOrder === "desc") {
    sort.price = -1;
  }

  const result = await Service.find(query).sort(sort);

  if (result.length === 0) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = req.body;
  const result = await serviceServices.updateServiceIntoDB(id, service);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await serviceServices.deleteServiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const serviceControllers = {
  createService,
  getSingleService,
  getSingleServiceDetails,
  getAllServices,
  updateService,
  deleteService,
};
