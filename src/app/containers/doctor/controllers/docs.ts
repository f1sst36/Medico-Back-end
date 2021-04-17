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
 * /doctor/paginate?page={page}&count={count}&fio={fio}&specialty={specialty}:
 *    get:
 *      tags:
 *        - Doctor
 *      description: Get doctors by paginate. /doctor/paginate?page=1&count=3. 'fio' and 'specialty' is not required. 'specialty' === slug
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
 *      - name: fio
 *        in: query
 *        description: Doctor's FIO
 *        required: false
 *        schema:
 *          type: string
 *          example:
 *            fio=Ivan Ivanov
 *      - name: specialty
 *        in: query
 *        description: Doctor's specialty
 *        required: false
 *        schema:
 *          type: string
 *          example:
 *            specialty=immunologist
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
 *                example: {"id":3,"name":"Георгий","surname":"Кличенко","middleName":"Николаевич","rating":null,"about":"Я врач - супер головач!","experience":"4 года","reviews":[{"id":1,"name":"Максим","surname":"Иванов","avatar":null,"text":"Какой же классный отзыв я могу оставить этому врачу","estimation":4,"createdAt":"2021-04-06"},{"id":2,"name":"Илья","surname":"Долженко","avatar":null,"text":"Какой же классный отзыв я могу оставить этому врачу","estimation":2,"createdAt":"2021-04-06"},{"id":3,"name":"Максим","surname":"Иванов","avatar":null,"text":"Какой же классный отзыв я могу оставить этому врачу","estimation":3,"createdAt":"2021-04-06"}],"education":["Высшее Томбовское образование","Грамота цетрального округа"],"workplaces":["Саратовчкая клиника под Донбассом","Центральная поликлинника города Ярославль"],"workTime":"с 10:00 до 18:00","photo":"/storage/files/doctor_6.jpg","costOfConsultation":1000,"specialties":[{"id":1,"name":"Терапевт","slug":"therapist"},{"id":2,"name":"Хирург","slug":"surgeon"}]}
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

/**
 * @swagger
 * /doctor/unverified:
 *    get:
 *      tags:
 *        - Admin
 *      description: Get all unverified doctors
 *      responses:
 *        '200':
 *          description: Successfully getted unverified doctors
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: Object
 *                example: [{"id":3,"IIN":"502313805346","experience":"2017-07-26T00:00:00.000Z","photo":"/storage/files/doctor_2.jpg","summary":"/storage/files/summary.jpg","diploma":"/storage/files/diploma.jpg","about":"Я врач - супер головач!","workplaces":["Саратовчкая клиника под Донбассом","Центральная поликлинника города Ярославль"],"education":["Высшее Томбовское образование","Грамота цетрального округа"],"sent":"2021-03-31T00:00:00.000Z","isVerified":false,"rating":null,"costOfConsultation":1000,"workTime":"с 10:00 до 18:00","createdAt":"2021-04-07T07:55:45.943Z","updatedAt":"2021-04-07T07:55:45.951Z","user":{"name":"Николай","surname":"Кличенко","phone":"+67203744345","email":"sdfdfqwvurhdyjmxww@mail.ru"}}]
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
 */

/**
 * @swagger
 * /doctor/most-experienced?count={count}:
 *    get:
 *      tags:
 *        - Doctor
 *      description: Get the most experienced doctors
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
 *                example: [{"name":"Сергей","surname":"Кличенко","middleName":"Николаевич","experience":"20 лет","photo":"/storage/files/doctor_1.jpg","specialties":[{"id":6,"name":"Косметолог","slug":"cosmetologist"},{"id":4,"name":"Эндокринолог","slug":"endocrinologist"}]}]
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
 *      - name: count
 *        in: query
 *        description: Count of doctors
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            count=1
 */

/**
 * @swagger
 * /doctor/review/list?reviewId={reviewId}&doctorId={doctorId}&count={count}:
 *    get:
 *      tags:
 *        - Review
 *      description: Get doctor's review list below than ID
 *      responses:
 *        '200':
 *          description: Successfully getted review list
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 0
 *              data:
 *                type: Object
 *                example: {"items":[{"id":31,"avatar":null,"name":"Илья","surname":"Долженко","text":"Какой же классный отзыв я могу оставить этому врачу","estimation":5,"createdAt":"2021-04-17"},{"id":30,"avatar":null,"name":"Илья","surname":"Долженко","text":"Какой же классный отзыв я могу оставить этому врачу","estimation":3,"createdAt":"2021-04-17"},{"id":29,"avatar":null,"name":"Максим","surname":"Иванов","text":"Какой же классный отзыв я могу оставить этому врачу","estimation":5,"createdAt":"2021-04-17"}],"count":6}
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
 *                example: "Отзывы не найдены"
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
 *        '422*':
 *          description: Unknown error
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: integer
 *                example: 1
 *              data:
 *                type: null
 *                example: null
 *              message:
 *                type: string
 *                example: "Ошибка получения отзывов"
 *                description: Reply message
 *    parameters:
 *      - name: reviewId
 *        in: query
 *        description: Reviews's id
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            reviewId=1
 *      - name: doctorId
 *        in: query
 *        description: Doctor's id
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            doctorId=1
 *      - name: count
 *        in: query
 *        description: Count of reviews
 *        required: true
 *        schema:
 *          type: number
 *          example:
 *            count=1
 */
