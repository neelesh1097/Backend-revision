import express from 'express';

import { UsernameController, searchController, updateUserController } from "./controller.js";

const router = express.Router();

router.get("/search" , searchController)

router.put("/:id", updateUserController)

router.get("/:username" , UsernameController)



export default router