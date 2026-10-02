import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paginated, paginated } from '../../common/dto/pagination.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ListProjectsDto } from './dto/list-projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}

  async findAll(query: ListProjectsDto): Promise<Paginated<Project>> {
    const qb = this.repo.createQueryBuilder('p').orderBy('p.name', 'ASC');
    if (query.status) qb.andWhere('p.status = :status', { status: query.status });
    if (query.q) qb.andWhere('(p.name ILIKE :q OR p.code ILIKE :q)', { q: `%${query.q}%` });
    qb.skip((query.page - 1) * query.limit).take(query.limit);

    const [rows, total] = await qb.getManyAndCount();
    return paginated(rows, total, query);
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    if (await this.repo.exist({ where: { code: dto.code }, withDeleted: true })) {
      throw new ConflictException(`Project code ${dto.code} is already in use`);
    }
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    return this.repo.save(Object.assign(project, dto));
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
