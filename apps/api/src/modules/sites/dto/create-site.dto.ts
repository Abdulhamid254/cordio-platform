import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsLatitude, IsLongitude, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { DataVisibility, HabitatType } from '../site.entity';

export class CreateSiteDto {
  @ApiProperty() @IsUUID() projectId: string;
  @ApiProperty() @IsString() @Length(2, 200) name: string;
  @ApiProperty() @IsString() @Length(2, 100) country: string;

  @ApiProperty({ example: -4.0435 }) @Type(() => Number) @IsLatitude() latitude: number;
  @ApiProperty({ example: 39.6682 }) @Type(() => Number) @IsLongitude() longitude: number;

  @ApiPropertyOptional({ enum: HabitatType }) @IsOptional() @IsEnum(HabitatType) habitat?: HabitatType;
  @ApiPropertyOptional({ enum: DataVisibility }) @IsOptional() @IsEnum(DataVisibility) visibility?: DataVisibility;
  @ApiPropertyOptional() @IsOptional() @IsString() protectionStatus?: string;
}
