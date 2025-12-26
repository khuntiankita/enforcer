    import  express  from "express";
    import cookieParser from "cookie-parser";
    import cors from "cors";
    import dotenv from "dotenv";
    import router from './routes/bookRoutes.js';
    
    import connectdb from "./config/db.js";
    import userRoutes from "./routes/userRoutes.js";
    
    dotenv.config();
    const app = express();
    
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
          origin: "http://localhost:3000",
          credentials: true, 
        })
        );
        
        connectdb();
        app.use("/api/users",userRoutes);
        app.use("/api/bookings", router);
    export default app;