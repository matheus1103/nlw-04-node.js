import "reflect-metadata";
import createConnection from './database';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { router } from './routes';
import { AppError } from "./err/appError";


createConnection();
const app =  express();

app.use(express.json())
app.use(router);

app.use((err: Error, request: Request,response: Response, _next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message: err.message})
        
    }
    return response.status(500).json({
        status:"Error",
        message:`Internal status error${err.message}`
    })
})


export { app }