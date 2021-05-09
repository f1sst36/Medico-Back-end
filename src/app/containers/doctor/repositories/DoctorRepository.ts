import { Patient } from '../../../containers/patient/models/Patient';
import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { User } from '../../user/models/User';
import { Doctor, DoctorSpecialtiesLink, Specialty } from '../models';
import { Review } from '../models/Review';
import { Sequelize } from 'sequelize';

class DoctorRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Doctor;
    }

    public getDoctorById = (id: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'password',
                                'confirmationToken',
                                'id',
                            ],
                        },
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
                            },
                        ],
                    },
                    {
                        model: Review,
                        as: 'reviews',
                        include: [
                            {
                                model: Patient,
                                as: 'patient',
                                include: [
                                    {
                                        model: User,
                                        as: 'user',
                                        attributes: ['name', 'surname'],
                                    },
                                ],
                                attributes: ['avatar'],
                            },
                        ],
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getDoctorByIdForToken = (id: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'password',
                                'confirmationToken',
                                'id',
                            ],
                        },
                    },
                    // {
                    //     model: DoctorSpecialtiesLink,
                    //     as: 'doctorSpecialtiesLink',
                    //     include: [
                    //         {
                    //             model: Specialty,
                    //             as: 'specialty',
                    //             attributes: ['id', 'name', 'slug'],
                    //         },
                    //     ],
                    // },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'diploma', 'summary', 'weeklySchedule'],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getVerifiedDoctorById = (id: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: id,
                    isVerified: true,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'password',
                                'confirmationToken',
                                'id',
                            ],
                        },
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
                            },
                        ],
                    },
                    {
                        model: Review,
                        as: 'reviews',
                        include: [
                            {
                                model: Patient,
                                as: 'patient',
                                include: [
                                    {
                                        model: User,
                                        as: 'user',
                                        attributes: ['name', 'surname'],
                                    },
                                ],
                                attributes: ['avatar'],
                            },
                        ],
                        limit: 3,
                        order: [['id', 'DESC']],
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getDoctorsByPaginate = (
        page: number,
        count: number,
        fio: string,
        specialtySlug: string
    ) => {
        try {
            const result = this.model.findAll({
                where: {
                    isVerified: true,
                    // abc: Sequelize.where(
                    //     "spec",
                    //     {
                    //         [Op.like]: `%${ Sequelize.col('Specialties.slug') }%`,
                    //     }
                    // ),
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'surname', 'middleName'],
                        where: {
                            [Op.or]: [
                                {
                                    fio: Sequelize.where(
                                        Sequelize.fn(
                                            'concat',
                                            Sequelize.col('name'),
                                            ' ',
                                            Sequelize.col('surname'),
                                            ' ',
                                            Sequelize.col('middleName')
                                        ),
                                        {
                                            [Op.iLike]: `%${fio}%`,
                                        }
                                    ),
                                },
                                {
                                    fio: Sequelize.where(
                                        Sequelize.fn(
                                            'concat',
                                            Sequelize.col('surname'),
                                            ' ',
                                            Sequelize.col('name'),
                                            ' ',
                                            Sequelize.col('middleName')
                                        ),
                                        {
                                            [Op.iLike]: `%${fio}%`,
                                        }
                                    ),
                                },
                            ],
                        },
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
                                where: {
                                    slug: Sequelize.where(Sequelize.col('slug'), {
                                        [Op.like]: `%${specialtySlug}%`,
                                    }),
                                    // slug: "immunologist",
                                },
                            },
                        ],
                    },
                ],
                attributes: [
                    'about',
                    'rating',
                    'experience',
                    'costOfConsultation',
                    'workTime',
                    'photo',
                ],
                offset: (page - 1) * count,
                limit: count,
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getCountOfDoctors = async (fio: string, specialtySlug: string): Promise<any> => {
        // Этот метод крайне гавёно написан. Перепиши, пожалуйста, как будет время и желание
        try {
            const result = await this.model.findAll({
                distinct: true,
                where: {
                    // id: {
                    //     [Op.gt]: 0,
                    // },
                    isVerified: true,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'surname', 'middleName'],
                        where: {
                            [Op.or]: [
                                {
                                    fio: Sequelize.where(
                                        Sequelize.fn(
                                            'concat',
                                            Sequelize.col('name'),
                                            ' ',
                                            Sequelize.col('surname'),
                                            ' ',
                                            Sequelize.col('middleName')
                                        ),
                                        {
                                            [Op.iLike]: `%${fio}%`,
                                        }
                                    ),
                                },
                                {
                                    fio: Sequelize.where(
                                        Sequelize.fn(
                                            'concat',
                                            Sequelize.col('surname'),
                                            ' ',
                                            Sequelize.col('name'),
                                            ' ',
                                            Sequelize.col('middleName')
                                        ),
                                        {
                                            [Op.iLike]: `%${fio}%`,
                                        }
                                    ),
                                },
                            ],
                        },
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
                                where: {
                                    slug: Sequelize.where(Sequelize.col('slug'), {
                                        [Op.like]: `%${specialtySlug}%`,
                                    }),
                                },
                            },
                        ],
                    },
                ],
                // limit - костыль
                limit: 999999,
            });
            return result.length;
        } catch (_) {
            return null;
        }
    };

    public isExistDoctorById = (doctorId: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: doctorId,
                },
                attributes: ['id'],
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getUnverifiedDoctors = (): Promise<Array<Doctor>> => {
        try {
            const result = this.model.findAll({
                where: {
                    isVerified: false,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'surname', 'phone', 'email'],
                    },
                ],
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getMostExperiencedDoctors = (count: number) => {
        try {
            const result = this.model.findAll({
                where: { isVerified: true },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'surname', 'middleName'],
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
                            },
                        ],
                    },
                ],
                attributes: ['id', 'photo', 'experience'],
                order: [['experience', 'ASC']],
                limit: count,
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    // Этот метод используется в двух разных тасках/экшенах!
    public getDoctorsWeeklySchedule = (doctorId: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: doctorId,
                },
                attributes: ['weeklySchedule'],
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getDoctorWithAllReviews = (doctorId: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: doctorId,
                },
                include: [
                    {
                        model: Review,
                        as: 'reviews',
                        attributes: ['id', 'estimation'],
                    },
                ],
                attributes: ['id', 'rating'],
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getDoctorForAppointment = (doctorId: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: doctorId,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'surname', 'middleName'],
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
                            },
                        ],
                    },
                ],
                attributes: ['id', 'rating', 'photo', 'costOfConsultation', 'experience'],
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getDoctorsFIO = (doctorId: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: doctorId,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'surname', 'middleName'],
                    },
                ],
                attributes: ['id'],
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public updateSchedule = (doctorId: number, newSchedule: object): Promise<number> => {
        try {
            return this.model.update(
                { schedule: newSchedule },
                { returning: true, where: { id: doctorId } }
            );
        } catch (e) {
            return null;
        }
    };
}

export const doctorRepository = new DoctorRepository();
