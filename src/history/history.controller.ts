import { Controller, Get, Body, UseGuards, HttpStatus, Post, Delete, Param, Patch, Res } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';
import { AddHistory, Analisis, DeleteHistory, HistoryDto, IncomeOutcome, UpdateHistory } from '../dto/history';
import { AnalisisResponse } from '../dto/analisis.response';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guards';
import { Response } from 'express';

@Controller('history')
@ApiTags('History')
@ApiBearerAuth()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Post('/add')
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, schema: {
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
                example: 'Data Analisis'
              },
            }
          },
          data: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties : {
                      today: {
                        type: 'integer',
                        description : 'Saving Money Today',
                        example : '0'
                      },
                      yesterday: {
                        type: 'integer',
                        description : 'Saving Money Yesterday',
                        example : '0'
                      },
                      week: {
                        type: 'array',
                        items: {
                          description: 'Saving Money Weekly',
                          example: '0'
                        }
                      },
                      month: {
                        type: 'object',
                        properties: {
                          income: {
                            type: 'integer',
                            description: 'Income in Month',
                            example: 10
                          },
                          outcome: {
                            type: 'integer',
                            description: 'Income in outcome',
                            example: 0
                          },
                        }
                      }
                    }
                  }
                }
              }
             }
        },
    } })
    @ApiResponse({ status: 400, schema: {
      type: 'object',
        properties: {
          meta: {
            type: 'object',
            properties: {
              code: {
                type: 'integer',
                description: 'HTTP Response Status',
                example: '400'
              },
              status: {
                type: 'string',
                description: 'Status',
                example: 'Failed'
              },
              message: {
                type: 'string',
                description: 'Message',
                example: 'Failed Data Analisis'
              },
            }
          },
          data: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  example: []
                }
              }
             }
        },
    } })
    async analisis(@Body() history: Analisis, @Res() res: Response) {
        return await this.historyService.analysis(history, res)
    }

    @Post('/inoutcome/:id_user/:type')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, schema: {
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
                example: 'Data Analisis'
              },
            }
          },
          data: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties : {
                      id_history: {
                        type: 'number',
                        description : 'Id History',
                        example : 1
                      },
                      id_user: {
                        type: 'number',
                        description : 'Id User',
                        example : 1
                      },
                      type: {
                        type: 'string',
                        description : 'Type of In Out Come',
                        example : "Pemasukan"
                      },
                      date: {
                        type: 'string',
                        description : 'Date In Out Come',
                        example : "2023-08-21"
                      },
                      total: {
                        type: 'string',
                        description : 'Total of In Out Come',
                        example : "10.000"
                      },
                      details: {
                        type: 'string',
                        description : 'Description of In Out Come',
                        example : "esteh"
                      },
                    }
                  }
                }
              }
             }
        },
    } })
    @ApiResponse({ status: 400, schema: {
      type: 'object',
        properties: {
          meta: {
            type: 'object',
            properties: {
              code: {
                type: 'integer',
                description: 'HTTP Response Status',
                example: '400'
              },
              status: {
                type: 'string',
                description: 'Status',
                example: 'Failed'
              },
              message: {
                type: 'string',
                description: 'Message',
                example: 'Failed Data Analisis'
              },
            }
          },
          data: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  example: []
                }
              }
             }
        },
    } })
    async inOutCome(@Param() history: IncomeOutcome, @Res() res: Response) {
      return await this.historyService.inOutCome(history, res);
    }

    @Post('/searchinoutcome/:id_user/:type/:date')
    @UseGuards(JwtAuthGuard)
    async inOutComeSearch(@Param() history: IncomeOutcome) {
      return await this.historyService.inOutComeSearch(history);
    }

    @Get('/historys')
    @UseGuards(JwtAuthGuard)
    async history(@Body() histores: HistoryDto) {
      return await this.historyService.history(histores)
    }

    @Post('/historysearch/:id_user/:date')
    @UseGuards(JwtAuthGuard)
    async historySearch(@Param() histores: HistoryDto) {
      return await this.historyService.historySearch(histores)
    }

    @Delete('/delete/:id_history')
    @UseGuards(JwtAuthGuard)
    async historyDelete(@Param() history: DeleteHistory) {
      return await this.historyService.DeleteHistory(history)
    }

    @Post('/detail/:id_user/:date/:type')
    @UseGuards(JwtAuthGuard)
    async detailHistory(@Param() history: IncomeOutcome) {
      return await this.historyService.detailHistory(history)
    }
    
    @Patch('/update/:id_history')
    @UseGuards(JwtAuthGuard)
    async updateHistory(@Param('id_history') id_history: number, @Body() updateHistory: UpdateHistory) {
        return await this.historyService.updateHistory(id_history, updateHistory);
    }

    @Post('/finddate/:id_user/:date')
    @UseGuards(JwtAuthGuard)
    async findWhereDate(@Param() histores: HistoryDto) {
      return await this.historyService.findWhereDate(histores);
    }
}
