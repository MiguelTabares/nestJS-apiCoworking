import { PartialType } from '@nestjs/swagger';
import { CreateUsersWorkspaceDto } from './create-users-workspace.dto';

export class UpdateUsersWorkspaceDto extends PartialType(
  CreateUsersWorkspaceDto,
) {}
