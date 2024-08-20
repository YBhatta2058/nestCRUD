import { Test, TestingModule } from '@nestjs/testing';
import { CollegesController } from './colleges.controller';
import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

describe('CollegesController', () => {
  let controller: CollegesController;
  let service: CollegesService;

  const mockCollegesService = {
    create: jest.fn().mockResolvedValue({ id: 1, name: 'Mock College', description: 'Mock Description', active: true }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Mock College', description: 'Mock Description', active: true }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Mock College', description: 'Mock Description', active: true }),
    update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated College', description: 'Updated Description', active: false }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollegesController],
      providers: [
        {
          provide: CollegesService,
          useValue: mockCollegesService,
        },
      ],
    }).compile();

    controller = module.get<CollegesController>(CollegesController);
    service = module.get<CollegesService>(CollegesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a college', async () => {
      const createCollegeDto: CreateCollegeDto = { name: 'New College', description: 'New Description', active: true };
      await controller.create(createCollegeDto);
      expect(service.create).toHaveBeenCalledWith(createCollegeDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of colleges', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, name: 'Mock College', description: 'Mock Description', active: true }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single college', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ id: 1, name: 'Mock College', description: 'Mock Description', active: true });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a college', async () => {
      const updateCollegeDto: UpdateCollegeDto = { name: 'Updated College', description: 'Updated Description', active: false };
      await controller.update('1', updateCollegeDto);
      expect(service.update).toHaveBeenCalledWith(1, updateCollegeDto);
    });
  });

  describe('remove', () => {
    it('should remove a college', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
