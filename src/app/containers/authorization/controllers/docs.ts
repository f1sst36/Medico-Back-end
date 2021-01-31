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

/**
 * @swagger
 * /auth/sign-in:
 *    post:
 *      tags:
 *        - Authorization
 *      description: Login a user
 *      responses:
 *        '200':
 *          description: Successfully logged in
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *              data:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    description: Access token.
 *                  tokenType:
 *                    type: string
 *                    description: Type of token.
 *              message:
 *                type: string
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
 *                description: Reply message
 *        '400*':
 *          description: Validation errors
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 1
 *              data:
 *                type: array
 *                items:
 *                  type: string
 *                example: ["Неверный e-mail", "Пароль должен быть от 6 до 40 символов"]
 *              message:
 *                type: string
 *                description: Reply message
 *                example: "Ошибка валидации"
 *    parameters:
 *      - name: email
 *        in: body
 *        description: Email of user
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            email: "example@mail.com"
 *      - name: password
 *        in: body
 *        description: Password of user
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 6
 *          maximum: 40
 *          example:
 *            password: qwe123WE
 */


/**
 * @swagger
 * /auth/sign-up:
 *    post:
 *      tags:
 *        - Authorization
 *      description: Registration a user
 *      responses:
 *        '200':
 *          description: Registered successfully
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: object
 *                example: null
 *              message:
 *                type: string
 *                description: Reply message
 *                example: "На указанную почту было выслано письмо с подтверждением аккаунта"
 *        '400*':
 *          description: Validation errors
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 1
 *              data:
 *                type: array
 *                items:
 *                  type: string
 *                example: ["Неверный e-mail", "Номер телефона имеет неверный формат"]
 *              message:
 *                type: string
 *                description: Reply message
 *                example: "Ошибка валидации"
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
 *                description: Reply message
 *    parameters:
 *      - name: name
 *        in: body
 *        description: Name of user
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            name: "Ivan"
 *      - name: surname
 *        in: body
 *        description: Surname of user
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            surname: "Ivanov"
 *      - name: middleName
 *        in: body
 *        description: Middle name of user
 *        required: false
 *        schema:
 *          type: string
 *          example:
 *            middleName: "Ivanovich"
 *      - name: email
 *        in: body
 *        description: Email of user
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            email: "example@mail.com"
 *      - name: age
 *        in: body
 *        description: Age of user
 *        required: true
 *        schema:
 *          type: integer
 *          example:
 *            age: 24
 *      - name: phone
 *        in: body
 *        description: User's phone number
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            phone: "+79783702015"
 *      - name: password
 *        in: body
 *        description: Password of user
 *        required: true
 *        schema:
 *          type: string
 *          minimum: 6
 *          maximum: 40
 *          example:
 *            password: qwe123WE
 *      - name: sex
 *        in: body
 *        description: User's sex
 *        required: true
 *        schema:
 *          type: string
 *          enum: [male, female]
 *          example:
 *            sex: male
 *      - name: birthDate
 *        in: body
 *        description: Birth date of user
 *        required: true
 *        schema:
 *          type: date
 *          example:
 *            birthDate: "2021-05-31"
 */
