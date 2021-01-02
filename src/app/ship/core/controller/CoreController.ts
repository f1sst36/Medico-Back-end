import { ICoreController } from "./ICoreController";

export abstract class CoreController implements ICoreController {
    public prefix = "";
    public router = undefined;
}
