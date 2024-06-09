import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { History } from '../entity/history.entity';
import { In, Like, Repository } from 'typeorm';
import { AddHistory, Analisis, DeleteHistory, HistoryDto, IncomeOutcome, UpdateHistory } from '../dto/history';
import { format } from 'date-fns';
import { Response } from 'express';
import { AnalisisResponse } from '../dto/analisis.response';
import { InOutComeResponse } from '../dto/inoutcome.response';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) 
        private readonly historyRepository: Repository<History>,
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {}

    async analysis(history: Analisis, @Res() res: Response) {
        const id_user = history.id_user;
        console.log(id_user)
        const today = new Date(history.today);
        console.log(today)
        const this_month = today.toISOString().slice(0, 7);
        console.log(this_month)

        const day7 = today.toISOString().slice(0, 10);
        console.log('day 7 : ', day7)
        const day6 = new Date(today);
        day6.setDate(today.getDate() - 1);
        console.log(day6)
        const day5 = new Date(today);
        day5.setDate(today.getDate() - 2);
        const day4 = new Date(today);
        day4.setDate(today.getDate() - 3);
        const day3 = new Date(today);
        day3.setDate(today.getDate() - 4);
        const day2 = new Date(today);
        day2.setDate(today.getDate() - 5);
        const day1 = new Date(today);
        day1.setDate(today.getDate() - 6);
            const week = [
              day1.toISOString().slice(0, 10),
              day2.toISOString().slice(0, 10),
              day3.toISOString().slice(0, 10),
              day4.toISOString().slice(0, 10),
              day5.toISOString().slice(0, 10),
              day6.toISOString().slice(0, 10),
              day7,
            ];
        console.log(week)

            const weekly = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
            console.log(weekly)
            let month_income = 0.0;
            console.log(month_income)
            let month_outcome = 0.0;
            console.log(month_outcome)

            const monthHistory = await this.historyRepository.find({
                where: { 
                    id_user: id_user, 
                    date: Like(`%${this_month}%`) 
                },
                order: { date: 'DESC' },
            });

            if (monthHistory.length > 0) {
                monthHistory.forEach((row_month: any) => {
                    const type =  row_month.type
                    if (type === 'Pemasukan') {
                        month_income += parseFloat(row_month.total);
                    } else {
                        month_outcome += parseFloat(row_month.total);
                    }
                })
                const responseAnalisis: AnalisisResponse = new AnalisisResponse()
                responseAnalisis.meta = {}
                responseAnalisis.meta.code = 201
                responseAnalisis.meta.status = 'Success',
                responseAnalisis.meta.message = 'Data Analisis'

                responseAnalisis.data = {}
                responseAnalisis.data.data = [
                    {
                        today: weekly[6],
                        yesterday: weekly[5],
                        week: weekly,
                        month: {
                            income: month_income,
                            outcome: month_outcome
                        }
                    }
                ]

                return res.status(201).send(responseAnalisis)
            }

            const weekHistory = await this.historyRepository.find({
                where: { 
                    id_user: id_user, 
                    date: In(week)
                },
                order: { date: 'DESC' },
            });

            if (weekHistory.length > 0) {
                weekHistory.forEach((row_week: any) => {
                    const type = row_week.type; // Pemasukan / Pengeluaran
                    const date = row_week.date.slice(0, 10);
                    if (type === 'Pengeluaran') {
                        const index = week.indexOf(date);
                        if (index !== -1) {
                            weekly[index] = parseFloat(row_week.total);
                        }
                    }
                })
                const responseAnalisis: AnalisisResponse = new AnalisisResponse()
                responseAnalisis.meta = {}
                responseAnalisis.meta.code = 201
                responseAnalisis.meta.status = 'Success',
                responseAnalisis.meta.message = 'Data Analisis'

                responseAnalisis.data = {}
                responseAnalisis.data.data = [
                    {
                        today: weekly[6],
                        yesterday: weekly[5],
                        week: weekly,
                        month: {
                            income: month_income,
                            outcome: month_outcome
                        }
                    }
                ]

                return res.status(201).send(responseAnalisis)
            }

            const responseInOutCome: InOutComeResponse = new InOutComeResponse()
            responseInOutCome.meta = {}
            responseInOutCome.meta.code = 400
            responseInOutCome.meta.status = 'Failed',
            responseInOutCome.meta.message = 'Failed Data Analisis'

            responseInOutCome.data = []
            // responseInOutCome.data = {}
            // responseInOutCome.data.data = []
            return res.status(400).send(responseInOutCome)  
    }

    async addHistory(history: AddHistory) {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

       const existingHistory = await this.historyRepository.findOne({
        where: {
            users: { id_user: history.id_user },
            date: history.date,
            type: history.type,
        }
       })

       if (existingHistory) {
            throw new  HttpException('Tanggal sudah pernah di daftarkan', HttpStatus.BAD_REQUEST);
       }

       const user = await this.userRepository.findOne({
        where: {
            id_user: history.id_user
        }
       });

       if (!user) {
        throw new  HttpException('User not found', HttpStatus.BAD_REQUEST);
       }

       const newHistory = this.historyRepository.create({
            id_user: history.id_user,
            type: history.type,
            date: history.date,
            total: history.total,
            details: [history.details],
            created_at: formattedDate,
            updated_at: formattedDate,
       })

       const result = await this.historyRepository.save(newHistory);
       return result;
    }

    async inOutCome(history: IncomeOutcome, @Res() res: Response) {
        const id_user = history.id_user
        const type = history.type
        const inoutCome =  await this.historyRepository.find({
            where: { id_user, type },
            order: {date: 'DESC'}
        })
        const responseInOutCome: InOutComeResponse = new InOutComeResponse()
        responseInOutCome.meta = {}
        if (inoutCome.length > 0) {
            
        responseInOutCome.meta.code = 201
        responseInOutCome.meta.status = 'Success',
        responseInOutCome.meta.message = 'Data Analisis'

        responseInOutCome.data = inoutCome.map(record => ({
            id_history: record.id_history,
            type: record.type,
            date: record.date,
            total: record.total,
        }))
        
        return res.status(201).send(responseInOutCome)
        } else {
            responseInOutCome.meta.code = 400
            responseInOutCome.meta.status = 'Failed',
            responseInOutCome.meta.message = 'Failed Data Analisis'

            responseInOutCome.data = [];
            return res.status(400).send(responseInOutCome)
        }
    }

    async detail(history: IncomeOutcome, @Res() res: Response) {
        const id_user = history.id_user
        const type = history.type
        const date = history.date
        const inoutCome =  await this.historyRepository.find({
            where: { id_user, type, date }
        })
        const inputString = inoutCome.map(record => ({
            details: record.details
        }))


        console.log('Detail ', inputString)
        const responseInOutCome: InOutComeResponse = new InOutComeResponse()
        responseInOutCome.meta = {}
        if (inoutCome.length > 0) {
            
        responseInOutCome.meta.code = 201
        responseInOutCome.meta.status = 'Success',
        responseInOutCome.meta.message = 'Data Analisis'

        responseInOutCome.data = inoutCome.map(record => ({
            id_history: record.id_history,
            id_user: record.id_user,
            type: record.type,
            date: record.date,
            total: record.total,
            details: record.details
        }))
        
        return res.status(201).send(responseInOutCome)
        } else {
            responseInOutCome.meta.code = 400
            responseInOutCome.meta.status = 'Failed',
            responseInOutCome.meta.message = 'Failed Data Analisis'

            responseInOutCome.data = [];
            return res.status(400).send(responseInOutCome)
        }
    }


    
    async inOutComeSearch(history: IncomeOutcome) {
        const id_user = history.id_user
        const type = history.type
        const date = history.date
        const search = await this.historyRepository.find({
            where: { id_user, type, date },
            order: { date: 'DESC' }
        })

        if (search.length > 0) {
            return search
        } else {
            return;
        }
    }

    async history(history: HistoryDto) {
        const id_user = history.id_user

        const historys = await this.historyRepository.find({
            where: {id_user},
            order: {date: 'DESC'}
        })

        if (historys.length > 0) {
            return historys
        } else {
            return
        }
    }

    async historySearch(history: HistoryDto) {
        const id_user = history.id_user
        const date = history.date

        const search = await this.historyRepository.find({
            where:{id_user, date},
            order: {date: 'DESC'}
        })

        if (search.length > 0) {
            return search
        } else {
            return
        }
    }

    async DeleteHistory(history: DeleteHistory) {
        const id_history = history.id_history

        const deleteHistory = await this.historyRepository.delete(id_history)

        if (deleteHistory) {
            return console.log('yeay')
        } else {
            return            
        }
    }

    async detailHistory(history: IncomeOutcome) {
        const detail = this.historyRepository.findOne({
            where: { id_user: history.id_user, type: history.type, date: history.date }
        })

        if (detail) {
            return detail
        } else {
            return
        }
    }

    async updateHistory(id_history: number, history: UpdateHistory) {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

        const check = await this.historyRepository.findOne({
            where: { id_history: id_history }
        })
        console.log(check)

        if (!check) {
            return false
        }

        check.id_user = history.id_user
        check.type = history.type
        check.date = history.date
        check.total = history.total
        check.details = [history.details]
        check.updated_at = formattedDate

        await this.historyRepository.save(check)
        return true
    }

    async findWhereDate(history: HistoryDto) {
        const id_user = history.id_user
        const date = history.date
        const findDate = await this.historyRepository.find({
            where: { id_user, date }
        })

        if (findDate.length > 0) {
            return findDate
        } else {
            return;
        }
    }
}
