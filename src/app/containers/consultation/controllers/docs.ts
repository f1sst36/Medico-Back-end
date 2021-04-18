/**
 * @swagger
 * /consultation/appointment/free-doctor-time?doctorId={doctorId}&date={date}:
 *    get:
 *      tags:
 *        - Consultation
 *      description: Free/busy time of the doctor on the specified day. if the transmitted date is less than the current date, the response will return as if the current date was transmitted.
 *      responses:
 *        '200':
 *          description: Successfully getted list
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: Object
 *                example: [ { "time": "9:00", "isClosed": false }, { "time": "10:00", "isClosed": false }, { "time": "11:00", "isClosed": false }, { "time": "12:00", "isClosed": false }, { "time": "14:00", "isClosed": false }, { "time": "15:00", "isClosed": true }, { "time": "16:00", "isClosed": false }, { "time": "17:00", "isClosed": false }, { "time": "18:00", "isClosed": false } ]
 *              message:
 *                type: string
 *                example: ""
 *                description: Reply message
 *        '200*':
 *          description: Successfully getted empty list
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: null
 *                example: null
 *              message:
 *                type: string
 *                example: "У врача нет приемов в этот день"
 *                description: Reply message
 *        '404':
 *          description: Not found
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 1
 *              data:
 *                type: object
 *                example: null
 *              message:
 *                type: string
 *                example: "Врач не найден или ошибка поиска консультации"
 *                description: Reply message
 *        '422':
 *          description: Validation error
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 1
 *              data:
 *                type: object
 *                example: ["Параметр должен быть числом"]
 *              message:
 *                type: string
 *                example: "Ошибка валидации"
 *                description: Reply message
 *    parameters:
 *      - name: date
 *        in: query
 *        description: The date of the scheduled consultation
 *        required: true
 *        schema:
 *          type: date
 *          example:
 *            date=2021-04-25T10:34:57.287Z
 *      - name: doctorId
 *        in: query
 *        description: Doctor's id
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            doctorId=1
 */
