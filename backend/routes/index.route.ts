import { Router } from "express";
import stackRouter from "./stacks.route";
import projectRouter from "./projects.route";

const router = Router();

router.use(stackRouter);
router.use(projectRouter);

export default router;
