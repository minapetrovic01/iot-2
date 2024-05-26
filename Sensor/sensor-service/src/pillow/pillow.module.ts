import { Module } from '@nestjs/common';
import { PillowService } from './pillow.service';
import { Pillow, PillowSchema } from './pillow.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pillow.name, schema: PillowSchema }])],
  // imports: [MongooseModule.forFeature([{ name: "pillowdb", schema: "pillow" }])],
  providers: [PillowService],
  controllers: []
})
export class PillowModule {}
