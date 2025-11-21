import express from 'express';

import { UsernameController, searchController } from "./controller.js";

const router = express.Router();

router.get("/search" , searchController)

router.get("/:username" , UsernameController)

export default router