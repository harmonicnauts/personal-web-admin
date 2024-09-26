import { Router } from "express";
import {
  createStack,
  deleteStack,
  getStackById,
  getStacks,
  updateStack,
} from "../controllers/stack.controller";

const router = Router();

/// GET
router.get("/stacks", getStacks);
router.get("/stack/:id", getStackById);

// ADD
router.post("/stack", createStack);

// UPDATE
router.patch("/stack/:id", updateStack);

// DELETE
router.delete("/stack/:id", deleteStack);

export default router;
