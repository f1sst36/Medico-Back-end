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
 *      - name: userType
 *        in: body
 *        description: "enum: 'doctor' or 'patient'"
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            userType: "doctor"
 *      - name: acceptedUserAgreement
 *        in: body
 *        description: "true or false"
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            acceptedUserAgreement: true
 */

/**
 * @swagger
 * /auth/confirmation-account:
 *    get:
 *      tags:
 *        - Authorization
 *      description: Confirmation account. /auth/confirmation-account?token=$2a$10$c21tI4D7gtmG58Q5RQF5duP7AI9YzxdpCDHgPhLVZ75zAxF1VCT2C
 *      responses:
 *        '200':
 *          description: Successfully confirmed account
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
 *                example: Аккаунт пользователя подтвержден
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
 *    parameters:
 *      - name: token
 *        in: query
 *        description: token of confirmation
 *        required: true
 *        type: string
 */
