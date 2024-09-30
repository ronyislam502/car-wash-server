import express from "express";
import { serviceControllers } from "./service.controller";

import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";

const router = express.Router();
// service creating route
router.post(
  "/",
  validateRequest(ServiceValidations.createServiceValidationSchema),
  serviceControllers.createService
);
router.get("/:id", serviceControllers.getSingleService);
router.get("/details/:id", serviceControllers.getSingleServiceDetails);
router.put(
  "/:id",
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  serviceControllers.updateService
);
router.delete("/:id", serviceControllers.deleteService);
router.get("/", serviceControllers.getAllServices);

export const ServiceRoutes = router;
