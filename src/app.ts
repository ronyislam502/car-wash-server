import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const getController = (req: Request, res: Response) => {
  res.send("car-wash app");
};

app.get("/", getController);
app.use(globalErrorHandler);
app.use(notFound);

// console.log(process.cwd());

export default app;
