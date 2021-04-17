export class CoreSeed {
    protected records: Array<Object>;

    protected randomInt = (leftSide, rightSide) => {
        return Math.round(Math.random() * (rightSide - leftSide)) + leftSide;
    };
}
