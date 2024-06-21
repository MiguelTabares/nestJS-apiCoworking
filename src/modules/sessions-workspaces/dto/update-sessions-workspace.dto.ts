import { PartialType } from '@nestjs/swagger';
import { CreateSessionsWorkspaceDto } from './create-sessions-workspace.dto';

export class UpdateSessionsWorkspaceDto extends PartialType(
  CreateSessionsWorkspaceDto,
) {}
