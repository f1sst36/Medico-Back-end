import { Router } from "express";

export abstract class CoreController {
    public prefix: string = "";
    public router: Router | undefined = undefined;
}
