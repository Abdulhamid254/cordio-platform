import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paginated, paginated } from '../../common/dto/pagination.dto';
import { ProjectsService } from '../projects/projects.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { ListSitesDto } from './dto/list-sites.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { GeoPoint, Site } from './site.entity';

const toPoint = (longitude: number, latitude: number): GeoPoint => ({
  type: 'Point',
  coordinates: [longitude, latitude],
});

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site) private readonly repo: Repository<Site>,
    private readonly projects: ProjectsService,
  ) {}

  async findAll(query: ListSitesDto): Promise<Paginated<Site>> {
    const qb = this.repo.createQueryBuilder('s').orderBy('s.name', 'ASC');
    if (query.projectId) qb.andWhere('s.project_id = :projectId', { projectId: query.projectId });
    if (query.country) qb.andWhere('s.country ILIKE :country', { country: query.country });
    if (query.habitat) qb.andWhere('s.habitat = :habitat', { habitat: query.habitat });
    if (query.q) qb.andWhere('s.name ILIKE :q', { q: `%${query.q}%` });
    qb.skip((query.page - 1) * query.limit).take(query.limit);

    const [rows, total] = await qb.getManyAndCount();
    return paginated(rows, total, query);
  }

  async findOne(id: string): Promise<Site> {
    const site = await this.repo.findOne({ where: { id } });
    if (!site) throw new NotFoundException(`Site ${id} not found`);
    return site;
  }

  async create(dto: CreateSiteDto): Promise<Site> {
    await this.projects.findOne(dto.projectId); // 404 if the project does not exist
    const { latitude, longitude, ...rest } = dto;
    return this.repo.save(this.repo.create({ ...rest, location: toPoint(longitude, latitude) }));
  }

  async update(id: string, dto: UpdateSiteDto): Promise<Site> {
    const site = await this.findOne(id);
    const { latitude, longitude, ...rest } = dto;
    Object.assign(site, rest);
    if (latitude !== undefined || longitude !== undefined) {
      const [lng, lat] = site.location.coordinates;
      site.location = toPoint(longitude ?? lng, latitude ?? lat);
    }
    return this.repo.save(site);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
