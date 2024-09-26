import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

const router = Router();

/// GET
router.get("/projects", getProjects);
router.get("/project/:proj_id", getProjectById);

/// ADD
router.post("/project", createProject);

/// UPDATE
router.put("/project/:proj_id", updateProject);

/// DELETE
router.delete("/project/:proj_id", deleteProject);

export default router;
