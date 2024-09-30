import httpStatus from "http-status";
import { bookingServices } from "./booking.service";
import { Booking } from "./booking.model";
import { handleNoDataResponse } from "../../errors/handleNoData";
import catchAsync from "../../utilities/catchAsync";
import { getUserInfoFromToken } from "../../utilities/getUserInfoFromToken";
import sendResponse from "../../utilities/sendResponse";

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const bookingData = req.body;

  const { email } = getUserInfoFromToken(token as string);

  const result = await bookingServices.createBookingIntoDB(email, bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await Booking.find()
    .populate("customer")
    .populate("service")
    .populate("slot")
    .lean();

  if (result?.length === 0) {
    return handleNoDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
};
