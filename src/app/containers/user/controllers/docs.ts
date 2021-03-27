/**
 * @swagger
 * /user/:
 *    get:
 *      tags:
 *        - User
 *      security:
 *        bearerAuth: []
 *      description: Get user info
 *      responses:
 *        '200':
 *          description: User data received
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: object
 *                example: {
 *                      
 *                  }
 *              message:
 *                type: string
 *                description: Reply message
 *                example: ""
 *        '400':
 *          description: Some error
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
 *                description: Reply message
 *                example: "Ошибка получения данных"
 *    parameters:
 *      - name: accessToken
 *        in: header
 *        description: User's token
 *        required: true
 *        schema:
 *          type: string
 */

/**
 * @swagger
 * /storage/files/:fileName:
 *    get:
 *      tags:
 *        - File
 *      description: localhost:8080/storage/files/slide3.png
 *    parameters:
 *      - name: fileName
 *        in: query
 *        description: File name
 *        required: true
 *        schema:
 *          type: string
 */
