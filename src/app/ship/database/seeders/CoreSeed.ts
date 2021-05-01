export class CoreSeed {
    protected records: Array<Object>;

    protected randomInt = (leftSide: number, rightSide: number) => {
        return Math.round(Math.random() * (rightSide - leftSide)) + leftSide;
    };
}
