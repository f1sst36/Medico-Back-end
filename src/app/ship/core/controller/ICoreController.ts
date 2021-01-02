import { Router } from "express";

export interface ICoreController {
    readonly prefix: string;
    router: Router | undefined;
}
