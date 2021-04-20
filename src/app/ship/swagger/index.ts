import { readJson } from '../helper';

const authorization = readJson('./src/app/ship/swagger/endpoints/authorization.json');
const consultation = readJson('./src/app/ship/swagger/endpoints/consultation.json');
const doctor = readJson('./src/app/ship/swagger/endpoints/doctor.json');
const admin = readJson('./src/app/ship/swagger/endpoints/admin.json');
const review = readJson('./src/app/ship/swagger/endpoints/review.json');
const patient = readJson('./src/app/ship/swagger/endpoints/patient.json');
const user = readJson('./src/app/ship/swagger/endpoints/user.json');
const other = readJson('./src/app/ship/swagger/endpoints/other.json');

export const swaggerOptions = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Medico API',
        description: 'API Information\n[ Base URL: /api/v1 ]',
        contact: {
            name: 'F1sst',
        },
        servers: ['http://localhost:8080'],
    },
    schemes: ['http', 'https'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'accessToken',
            in: 'header',
        },
    },
    paths: {
        ...authorization,
        ...consultation,
        ...doctor,
        ...admin,
        ...review,
        ...patient,
        ...user,
        ...other,
    },
    definitions: {
        SuccessResponse: {
            type: 'object',
            properties: {
                error: {
                    type: 'number',
                    example: 0,
                },
                message: {
                    type: 'string',
                    example: 'Reply message',
                },
                data: {
                    type: 'object',
                    example: { foo: 'bar' },
                },
            },
        },
        ErrorResponse: {
            type: 'object',
            properties: {
                error: {
                    type: 'number',
                    example: 1,
                },
                data: {
                    type: 'null',
                    example: null,
                },
                message: {
                    type: 'string',
                    example: 'Reply message',
                },
            },
        },
    },
    responses: {
        400: { description: 'Bad Request', schema: "$ref: '#/definitions/ErrorResponse'" },
        401: { description: 'Unauthorized', schema: "$ref: '#/definitions/ErrorResponse'" },
        403: { description: 'Forbidden', schema: "$ref: '#/definitions/ErrorResponse'" },
        404: { description: 'Not Found', schema: "$ref: '#/definitions/ErrorResponse'" },
        422: { description: 'Unprocessable Etity', schema: "$ref: '#/definitions/ErrorResponse'" },
    },
    parameters: {},
    tags: [
        'Authorization',
        'Consultation',
        'Doctor',
        'Admin',
        'Review',
        'Patient',
        'User',
        'Other',
    ],
};
