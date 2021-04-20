import { Patient } from '../../../containers/patient/models/Patient';
import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { User } from '../../user/models/User';
import { Doctor, DoctorSpecialtiesLink, Specialties } from '../models';
import { Review } from '../models/Review';
import { Sequelize } from 'sequelize';

class DoctorRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Doctor;
    }

    public getDoctorById = (id: Number): Promise<Doctor> => {
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
                                model: Specialties,
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

    public getDoctorByIdForToken = (id: Number): Promise<Doctor> => {
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
                                model: Specialties,
                                as: 'specialty',
                                attributes: ['id', 'name', 'slug'],
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

    public getVerifiedDoctorById = (id: Number): Promise<Doctor> => {
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
                                model: Specialties,
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
                                    [Op.like]: `%${fio}%`,
                                }
                            ),
                        },
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: 'doctorSpecialtiesLink',
                        include: [
                            {
                                model: Specialties,
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

    public getCountOfDoctors = (): Promise<number> => {
        try {
            const result = this.model.count({
                where: {
                    id: {
                        [Op.gt]: 0,
                    },
                    isVerified: true,
                },
            });
            return result;
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

    public getMostExperiencedDoctors = (count: Number) => {
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
                                model: Specialties,
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

    public getDoctorsWorkTimeByDay = (doctorId: number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: doctorId,
                },
                attributes: ['workTimeByDay'],
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
                                model: Specialties,
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
}

export const doctorRepository = new DoctorRepository();
