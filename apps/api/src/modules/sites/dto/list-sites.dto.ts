import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { HabitatType } from '../site.entity';

export class ListSitesDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() projectId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() country?: string;
  @ApiPropertyOptional({ enum: HabitatType }) @IsOptional() @IsEnum(HabitatType) habitat?: HabitatType;
  @ApiPropertyOptional({ description: 'Search by site name' }) @IsOptional() @IsString() q?: string;
}
