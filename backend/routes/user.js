import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/", upload.single("profileImage"), createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/users/:id", upload.single("profileImage"), updateUser);

router.delete("/users/:id", deleteUser);

export default router;
