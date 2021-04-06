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
 *                type: Array<Object>
 *                example: [{ id: 1, name: "Хирург", slug: "surgeon" },  {id: 2, name: "Терапевт", slug: "therapist" }]
 *              message:
 *                type: string
 *                example: ""
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
 *                example: "Специальности отсутствуют"
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

/**
 * @swagger
 * /doctor/profile/questionnaire:
 *    post:
 *      tags:
 *        - Doctor
 *      security:
 *        bearerAuth: []
 *      description: Questionnaire form is successfully filled
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
 *                type: null
 *                example: null
 *              message:
 *                type: string
 *                example: "Заявка отправлена на рассмотрение"
 *                description: Reply message
 *        '422':
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
 *                example: ["Необходимо указать ИИН", "Необходимо загрузить диплом"]
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
 *                example: "Ошибка при отправке заявки"
 *                description: Reply message
 *    parameters:
 *      - name: IIN
 *        in: formData
 *        description: IIN of user (12 chars)
 *        required: true
 *        schema:
 *          type: string
 *          example:
 *            123123123123
 *      - name: experience
 *        in: formData
 *        description: Experience of user
 *        required: true
 *        schema:
 *          type: date
 *          example:
 *            2015-06-12
 *      - name: photo
 *        in: formData
 *        description: Photo of user (File)
 *        required: true
 *        schema:
 *          type: file
 *      - name: summary
 *        in: formData
 *        description: Summary of user (File)
 *        required: true
 *        schema:
 *          type: file
 *      - name: diploma
 *        in: formData
 *        description: Diploma of user (File)
 *        required: true
 *        schema:
 *          type: file
 *      - name: specialties
 *        in: formData
 *        description: Doctor specialties
 *        required: true
 *        schema:
 *          type: date
 *          example:
 *            [1, 4, 5]
 */

/**
 * @swagger
 * /doctor/paginate?page={page}&count={count}:
 *    get:
 *      tags:
 *        - Doctor
 *      description: Get doctors by paginate. /doctor/paginate?page=1&count=3
 *      responses:
 *        '200':
 *          description: Successfully getted doctors
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: Object
 *                example: {
 *                        items: [{
 *                                  "about":"Я врач - супер головач!",
 *                                  "rating":null,
 *                                  "experience":"3 года",
 *                                  "costOfConsultation":1000,
 *                                  "workTime":"с 10:00 до 18:00",
 *                                  "photo":"/storage/files/doctor_5.jpg",
 *                                  "specialties":[{"id":1,"name":"Терапевт","slug":"therapist"},{"id":2,"name":"Хирург","slug":"surgeon"}],
 *                                  "id": 1,
 *                                  "name":"Влад",
 *                                  "surname":"Кличенко",
 *                                  "middleName":"Николаевич"
 *                                  },
 *                              {}, {}],
 *                        meta: {
 *                             totalCount: 10,
 *                             pageCount: 4,
 *                             currentPage: 1,
 *                             perPage: 3
 *                          }
 *                      }
 *              message:
 *                type: string
 *                example: ""
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
 *                example: "Врачи не найдены"
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
 *                example: "Ошибка получения врачей"
 *                description: Reply message
 *    parameters:
 *      - name: page
 *        in: query
 *        description: Number of page
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            page=1
 *      - name: count
 *        in: query
 *        description: Count of items per page
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            count=3
 */

/**
 * @swagger
 * /doctor/info?id={id}:
 *    get:
 *      tags:
 *        - Doctor
 *      description: Get doctor by id
 *      responses:
 *        '200':
 *          description: Successfully getted doctor
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: Object
 *                example: {"id":4,"name":"Дмитрий","surname":"Кличенко","middleName":"Николаевич","rating":null,"about":"Я врач - супер головач!","experience":"4 года","reviews":[{"name":"Максим","surname":"Иванов","avatar":null,"text":"Какой же классный отзыв я могу оставить этому врачу","createdAt":"2021-04-06"},{"name":"Илья","surname":"Долженко","avatar":null,"text":"Какой же классный отзыв я могу оставить этому врачу","createdAt":"2021-04-06"}],"education":["Высшее Томбовское образование","Грамота цетрального округа"],"workplaces":["Саратовчкая клиника под Донбассом","Центральная поликлинника города Ярославль"],"workTime":"с 10:00 до 18:00","photo":"/storage/files/doctor_1.jpg","costOfConsultation":1000,"specialties":[{"id":1,"name":"Терапевт","slug":"therapist"},{"id":2,"name":"Хирург","slug":"surgeon"}]}
 *              message:
 *                type: string
 *                example: ""
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
 *                example: "Доктор не найден"
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
 *      - name: id
 *        in: query
 *        description: Doctor's id
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            id=1
 */
