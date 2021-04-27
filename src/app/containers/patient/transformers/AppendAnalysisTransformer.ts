import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Analysis } from '../models/Analysis';

interface IAnalysis {
    id: number;
    name: string;
    type: string;
    analysisDeliveryDate: Date;
    path: string;
}

class AppendAnalysisTransformer extends CoreTransformer {
    public transform = (analysis: Analysis): IAnalysis => {
        return {
            id: analysis.getDataValue('id'),
            name: analysis.getDataValue('name'),
            type: analysis.getDataValue('type'),
            analysisDeliveryDate: analysis.getDataValue('analysisDeliveryDate'),
            path: analysis.getDataValue('path'),
        };
    };
}

export const appendAnalysisTransformer = new AppendAnalysisTransformer();
