import { Controller, Get, Body, UseGuards, HttpStatus, Post, Delete, Param, Patch } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';
import { AddHistory, Analisis, DeleteHistory, HistoryDto, IncomeOutcome, UpdateHistory } from '../dto/history';
import { AnalisisResponse } from '../dto/analisis.response';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Post('/add')
    @UseGuards(AuthGuard())
    async add(@Body() addhistory: AddHistory) {
        return await this.historyService.addHistory(addhistory);
    }

    @Get('/analisis')
    @UseGuards(AuthGuard())
    async analisis(@Body() history: Analisis): Promise<AnalisisResponse> {
          try {
              const result = await this.historyService.analysis(history);
              return result;
            } catch (error) {
              return {
                meta: {
                  code: HttpStatus.INTERNAL_SERVER_ERROR,
                  status: 'error',
                  message: error.message,
                },
                data: {
                  message: error.message,
                },
              }
            }
    }

    @Get('/inoutcome')
    @UseGuards(AuthGuard())
    async inOutCome(@Body() history: IncomeOutcome) {
      return await this.historyService.inOutCome(history);
    }

    @Post('/searchinoutcome/:id_user/:type/:date')
    @UseGuards(AuthGuard())
    async inOutComeSearch(@Param() history: IncomeOutcome) {
      return await this.historyService.inOutComeSearch(history);
    }

    @Get('/historys')
    @UseGuards(AuthGuard())
    async history(@Body() histores: HistoryDto) {
      return await this.historyService.history(histores)
    }

    @Post('/historysearch/:id_user/:date')
    @UseGuards(AuthGuard())
    async historySearch(@Param() histores: HistoryDto) {
      return await this.historyService.historySearch(histores)
    }

    @Delete('/delete/:id_history')
    @UseGuards(AuthGuard())
    async historyDelete(@Param() history: DeleteHistory) {
      return await this.historyService.DeleteHistory(history)
    }

    @Post('/detail/:id_user/:date/:type')
    @UseGuards(AuthGuard())
    async detailHistory(@Param() history: IncomeOutcome) {
      return await this.historyService.detailHistory(history)
    }
    
    @Patch('/update/:id_history')
    @UseGuards(AuthGuard())
    async updateHistory(@Param('id_history') id_history: number, @Body() updateHistory: UpdateHistory) {
        return await this.historyService.updateHistory(id_history, updateHistory);
    }

    @Post('/finddate/:id_user/:date')
    @UseGuards(AuthGuard())
    async findWhereDate(@Param() histores: HistoryDto) {
      return await this.historyService.findWhereDate(histores);
    }
}
