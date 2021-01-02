import { Request, Response } from "express";

export interface IAuthController{
    login: (req:Request, res:Response) => void,
    logout: (req:Request, res:Response) => void,
}