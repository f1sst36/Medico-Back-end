 /**
 * @swagger
 * /doctor/specialties:
 *    get:
 *      tags:
 *        - Doctor
 *      description: Get all specialties list
 *      responses:
 *        '200':
 *          description: Successfully getted specialties list
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: Array
 *                example: ["Хирург", "Терапевт", "Психолог"]
 *              message:
 *                type: string
 *                example: ""
 *                description: Reply message
 *        '400':
 *          description: Bad request
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
 *                example: "Ошибка получения специальностей"
 *                description: Reply message
 */
