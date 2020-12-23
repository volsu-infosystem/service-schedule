import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('schedule')
@UseGuards(JwtAuthGuard)
export class ScheduleController {}
