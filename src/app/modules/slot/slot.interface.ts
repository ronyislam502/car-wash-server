import { Types } from "mongoose";

export interface TSlot {
  service: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: "booked" | "available" | "canceled";
}
