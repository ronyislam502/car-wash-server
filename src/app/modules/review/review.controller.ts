import httpStatus from "http-status";

import { reviewServices } from "./review.service";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";

const getReviews = catchAsync(async (req, res) => {
  const number = Number(req.query.number) || 0;
  const result = await reviewServices.getReviewsFromDB(Number(number));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is retrieved successfully",
    data: result,
  });
});

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const result = await reviewServices.createReviewIntoDB(reviewData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewControllers = {
  getReviews,
  createReview,
};
