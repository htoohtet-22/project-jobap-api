import {
  Controller,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationsService } from './applications.service';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from '../generated/prisma/enums';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a job application' })
  create(@CurrentUser() user: { userId: string }, @Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(user.userId, dto);
  }
}