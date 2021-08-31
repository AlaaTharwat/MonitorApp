import express from "express";
import cors from "cors";
import requestLogger from "../Shared/lib/requestLogger";

export default (app) => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(requestLogger);
};
