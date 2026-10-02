import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSiteDto } from './dto/create-site.dto';
import { ListSitesDto } from './dto/list-sites.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SitesService } from './sites.service';

@ApiTags('sites')
@Controller('sites')
export class SitesController {
  constructor(private readonly sites: SitesService) {}

  @Get() findAll(@Query() query: ListSitesDto) { return this.sites.findAll(query); }

  @Get(':id') findOne(@Param('id', ParseUUIDPipe) id: string) { return this.sites.findOne(id); }

  @Post() create(@Body() dto: CreateSiteDto) { return this.sites.create(dto); }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSiteDto) {
    return this.sites.update(id, dto);
  }

  @Delete(':id') @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.sites.remove(id); }
}
