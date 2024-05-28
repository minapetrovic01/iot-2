import { Controller, Get, Param, Delete, Put, Body, Post, Query } from '@nestjs/common';
import { DataAnalyseService } from './data-analyse.service';
import { PillowAnalysed } from 'src/models/pillowanalise.model';
import { PillowAnalysedID } from 'src/models/pillowanalisedid.model';

@Controller('data-analyse')
export class DataAnalyseController {
    constructor(private readonly dataAnalyseService: DataAnalyseService) { }

    @Get()
    async findAll(): Promise<PillowAnalysed[]> {
      return this.dataAnalyseService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PillowAnalysed> {
      return this.dataAnalyseService.findOne(id);
    }
  
    @Delete(':id')
    async deleteOne(@Param('id') id: string): Promise<void> {
      return this.dataAnalyseService.deleteOne(id);
    }
  
    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() data: PillowAnalysedID): Promise<void> {
      return this.dataAnalyseService.updateOne(id, data);
    }
  
    @Get('findByStressRate')
    async findByStressRate(@Query('stressRate') stressRate: string): Promise<PillowAnalysed[]> {
      return this.dataAnalyseService.findByStressRate(stressRate);
    }
  
    @Get('findByHeartRate')
    async findByHeartRate(@Query('min') min: string, @Query('max') max: string): Promise<PillowAnalysed[]> {
      return this.dataAnalyseService.findByHeartRate(min, max);
    }
  
    @Post()
    async create(@Body() data: PillowAnalysed): Promise<PillowAnalysed> {
      return this.dataAnalyseService.create(data);
    }
}
