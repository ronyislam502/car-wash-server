import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";
import { slotControllers } from "./slot.controller";

const router = express.Router();

router.post(
  "/slots",
  validateRequest(SlotValidations.createSlotValidationSchema),
  slotControllers.createSlot
);

router.get("/availability", slotControllers.getAvailableSlots);

router.get("/all-slots", slotControllers.getAllSlots);

router.put(
  "/update-slot/:id",
  validateRequest(SlotValidations.updateSlotValidationSchema),
  slotControllers.updateSlot
);

export const SlotRoutes = router;
