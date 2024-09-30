import httpStatus from "http-status";

import { AuthServices } from "./auth.service";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    accessToken: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  loginUser,
};
