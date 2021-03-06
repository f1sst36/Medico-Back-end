/**
 * @swagger
 * /pacient/profile/questionnaire:
 *    post:
 *      tags:
 *        - Pacient
 *      security:
 *        bearerAuth: []
 *      description: Fill the questionnaire form
 *      responses:
 *        '200':
 *          description: Questionnaire form is successfully filled
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
 *                example: "Анкета успешно заполнена"
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
 *                example: ["Необходимо указать рост", "Неверный формат списка хронических заболеваний"]
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
 *                description: "Ошибка при обновлении пользователя"
 *    parameters:
 *      - name: weight
 *        in: body
 *        description: Weight of user
 *        required: true
 *        schema:
 *          type: float
 *          example:
 *            weight: 60.5
 *      - name: height
 *        in: body
 *        description: Height of user
 *        required: true
 *        schema:
 *          type: float
 *          example:
 *            height: 180
 *      - name: bloodType
 *        in: body
 *        description: User's type of blood
 *        required: true
 *        schema:
 *          type: string
 *          enum: [I, II, III, IV]
 *          example:
 *            bloodType: "II"
 *      - name: RHFactor
 *        in: body
 *        description: User's RHFactor
 *        required: true
 *        schema:
 *          type: string
 *          enum: [Rh+, Rh-]
 *          example:
 *            RHFactor: "Rh+"
 *      - name: allergies
 *        in: body
 *        description: User's allergies list
 *        required: true
 *        schema:
 *          type: array<String>
 *          example:
 *            allergies: []
 *      - name: chronicDiseases
 *        in: body
 *        description: User's chronic diseases list
 *        required: true
 *        schema:
 *          type: array<String>
 *          example:
 *            chronicDiseases: ["foo", "bar"]
 *      - name: isSmoker
 *        in: body
 *        description: Is user a smoker
 *        required: true
 *        schema:
 *          type: string
 *          enum: [Да, Нет, Иногда]
 *          example:
 *            isSmoker: "Нет"
 *      - name: isAlcoholic
 *        in: body
 *        description: Is user a alcoholic
 *        required: true
 *        schema:
 *          type: string
 *          enum: [1 раз в год, 1 раз в месяц, 1 раз в неделю, более 3 раз в неделю]
 *          example:
 *            isAlcoholic: "1 раз в месяц"
 *      - name: badHabits
 *        in: body
 *        description: Bad habits list
 *        required: false
 *        schema:
 *          type: string
 *          example:
 *            badHabits: "bla-balab-a-ba-bdl"
 *      - name: bloodTransfusion
 *        in: body
 *        description: "true: 1 or 'true'"
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            bloodTransfusion: true
 */
