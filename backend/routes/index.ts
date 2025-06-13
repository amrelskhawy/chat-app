import { Router } from "express";

// import Routes
import AuthRoutes from "./auth.routes";

// Create a new router instance
const router: Router = Router();

// Define the routes
router.use("/api/auth", AuthRoutes);

export default router;
