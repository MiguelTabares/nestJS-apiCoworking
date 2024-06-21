import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SessionService } from './sessions.service';
import { CreateSessionDto } from '../../shared/dtos/index-dtos';
import { Session } from '../../shared/entities/index-entities';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('most-booked')
  async getMostBookedSessions() {
    return this.sessionService.getMostBookedSessions();
  }

  @Get('most-available')
  async getMostAvailableSessions() {
    return this.sessionService.getMostAvailableSessions();
  }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  findAll(): Promise<Session[]> {
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Session> {
    return this.sessionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSessionDto: CreateSessionDto,
  ): Promise<Session> {
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sessionService.remove(id);
  }
}
