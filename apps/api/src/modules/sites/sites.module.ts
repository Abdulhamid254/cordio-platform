import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { Site } from './site.entity';
import { SitesController } from './sites.controller';
import { SitesService } from './sites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site]), ProjectsModule],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService],
})
export class SitesModule {}
