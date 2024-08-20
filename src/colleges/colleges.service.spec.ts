import { Test, TestingModule } from '@nestjs/testing';
import { CollegesService } from './colleges.service';
import { Repository } from 'typeorm';
import { College } from './entities/college.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CollegesService', () => {
  let service: CollegesService;
  let repository: Repository<College>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollegesService,
        { provide: getRepositoryToken(College), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CollegesService>(CollegesService);
    repository = module.get<Repository<College>>(getRepositoryToken(College));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a college', async () => {
      const createCollegeDto = { name: 'Test College', description: 'A test college', active: true };
      const savedCollege = { id: 1, ...createCollegeDto };
      mockRepository.create.mockReturnValue(savedCollege);
      mockRepository.save.mockResolvedValue(savedCollege);

      const result = await service.create(createCollegeDto);

      expect(result).toEqual(savedCollege);
      expect(mockRepository.create).toHaveBeenCalledWith(createCollegeDto);
      expect(mockRepository.save).toHaveBeenCalledWith(savedCollege);
    });
  });

  describe('findAll', () => {
    it('should return an array of colleges', async () => {
      const result = [{ id: 1, name: 'Test College', description: 'A test college', active: true }];
      mockRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single college', async () => {
      const result = { id: 1, name: 'Test College', description: 'A test college', active: true };
      mockRepository.findOne.mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw a NotFoundException if the college is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and save a college', async () => {
      const updateCollegeDto = { name: 'Updated College', description: 'Updated description' };
      const existingCollege = { id: 1, name: 'Test College', description: 'A test college', active: true };
      const updatedCollege = { ...existingCollege, ...updateCollegeDto };

      mockRepository.findOne.mockResolvedValue(existingCollege);
      mockRepository.save.mockResolvedValue(updatedCollege);

      await service.update(1, updateCollegeDto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedCollege);
    });

    it('should throw a NotFoundException if the college is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, { name: 'Updated College' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a college', async () => {
      const college = { id: 1, name: 'Test College', description: 'A test college', active: true };
      mockRepository.findOne.mockResolvedValue(college);
      mockRepository.remove.mockResolvedValue(college);

      expect(await service.remove(1)).toEqual(college);
    });

    it('should throw a NotFoundException if the college is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
