import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { Repository } from 'typeorm';
import { College } from './entities/college.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollegesService {

  constructor(
    @InjectRepository(College)
    private readonly collegesRepository : Repository<College>
  )
    {}

  async create(createCollegeDto: CreateCollegeDto) {
    const college = this.collegesRepository.create(createCollegeDto)
    return await this.collegesRepository.save(college) 
  }

  findAll() {
    return this.collegesRepository.find();
  }

  async findOne(id: number) {
    const college = await this.collegesRepository.findOne({ where: { id } });
    if (!college) {
      throw new NotFoundException(`College with id ${id} not found`);
    }
    return college;
  }

  async update(id: number, updateCollegeDto: UpdateCollegeDto) {
    const college = await this.collegesRepository.findOne({where: {id}})
    if(!college){
      throw new NotFoundException();
    }

    Object.assign(college, updateCollegeDto);
    this.collegesRepository.save(college)
  }

  async remove(id: number) {
    const college = await this.collegesRepository.findOne({where: {id}})
    if(!college){
      throw new NotFoundException();
    }

    return await this.collegesRepository.remove(college)
  }
}
