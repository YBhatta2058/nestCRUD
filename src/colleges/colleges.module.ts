import { Module } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { CollegesController } from './colleges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { College } from './entities/college.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College])],
  controllers: [CollegesController],
  providers: [CollegesService],
})
export class CollegesModule {}