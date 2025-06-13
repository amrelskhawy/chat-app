import { login, signup, logout } from "@controllers/auth.controller";

import express from "express";

const router: express.Router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
