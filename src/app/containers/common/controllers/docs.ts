/**
 * @swagger
 * /user/create:
 *    post:
 *      tags:
 *        - User
 *      security:
 *        bearerAuth: []
 *      description: Creates a user
 *      responses:
 *        '200':
 *          description: Successfully created user
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Users name.
 *              age:
 *                type: integer
 *                description: Users age.
 *        '400':
 *          description: Bad request
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                description: Type of error.
 *              message:
 *                type: string
 *                description: Message of error.
 *    parameters:
 *      - name: name
 *        in: body
 *        description: Name of user
 *        required: true
 *        schema:
 *          type: string
 *          minLength: 3
 *          maxLength: 80
 *          example:
 *            name: "Ivan"
 *      - name: age
 *        in: body
 *        description: Age of user
 *        required: true
 *        schema:
 *          type: integer
 *          format: int32
 *          minimum: 0
 *          example:
 *            age: 25
 */
