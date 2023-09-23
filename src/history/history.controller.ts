import { Controller, Get, Body, UseGuards, HttpStatus, Post, Delete, Param, Patch } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';
import { AddHistory, Analisis, DeleteHistory, HistoryDto, IncomeOutcome, UpdateHistory } from '../dto/history';
import { AnalisisResponse } from '../dto/analisis.response';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('history')
@ApiTags('History')
@ApiBearerAuth()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Post('/add')
    @UseGuards(AuthGuard())
    @ApiCreatedResponse({ status: 201, schema: {
      type: 'object',
        properties: {
          meta: {
            type: 'object',
            properties: {
              code: {
                type: 'integer',
                description: 'HTTP Response Status',
                example: '201'
              },
              status: {
                type: 'string',
                description: 'Status',
                example: 'Success'
              },
              message: {
                type: 'string',
                description: 'Message',
                example: 'Successfully Added Data'
              },
            }
          },
          data: {
            type: 'object',
            properties: {
              id_user: {
                type: 'number',
                description: 'Id User',
                example: '1'
              },
              type: {
                type: 'number',
                description: 'Saving Type',
                example: 'Pemasukan'
              },
              date: {
                type: 'string',
                description: 'Saving Date',
                example: '2023-08-21'
              },
              total: {
                type: 'string',
                description: 'Saving Amount',
                example: '10.000'
              },
              details: {
                type: 'string',
                description: 'Saving Information',
                example: 'esteh'
              },
              created_at: {
                type: 'date',
                description: 'Date Created to database',
                example: '2023-09-23T01:08:12.300'
              },
              updated_at: {
                type: 'string',
                description: 'Update Date to the database',
                example: '2023-09-23T01:08:12.300'
              },
            }
          }
        },
    } })
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
