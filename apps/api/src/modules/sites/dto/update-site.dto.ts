import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSiteDto } from './create-site.dto';

/** A site cannot be moved between projects; create a new site instead. */
export class UpdateSiteDto extends PartialType(OmitType(CreateSiteDto, ['projectId'] as const)) {}
