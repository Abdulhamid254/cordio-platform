import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ProjectStatus } from '../project.entity';

export class CreateProjectDto {
  @ApiProperty() @IsString() @Length(2, 200)
  name: string;

  @ApiProperty({ example: 'KE-REEF-01' })
  @IsString() @Matches(/^[A-Z0-9-]{3,30}$/, { message: 'code must be 3-30 uppercase letters, digits or dashes' })
  code: string;

  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() country?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() funder?: string;
  @ApiPropertyOptional({ enum: ProjectStatus }) @IsOptional() @IsEnum(ProjectStatus) status?: ProjectStatus;
  @ApiPropertyOptional() @IsOptional() @IsDateString() startDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() endDate?: string;
}
