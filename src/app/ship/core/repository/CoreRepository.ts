export abstract class CoreRepository {
    protected model = undefined;

    public startConditions = () => {
        return this.model;
    };
}
