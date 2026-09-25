import {
  Controller,
  UseGuards,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationsService } from './applications.service.js';
import { CurrentUser } from '../auth/decorator/current-user.decorator.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';

@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a job application' })
  create(
    @CurrentUser() user: { userId: string }, 
    @Body() dto: CreateApplicationDto
  ) {
    return this.applicationsService.create(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job aplications' })
  findAll(
    @CurrentUser() user: { userId: string },
  ) {
    return this.applicationsService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single job application' })
  findOne(
    @CurrentUser() user: { userId: string }, 
    @Param('id') id: string
  ) {
    return this.applicationsService.findOne(user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job application' })
  update(
    @CurrentUser() user: { userId: string },
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job application' })
  remove(
    @CurrentUser() user: { userId: string }, 
    @Param('id') id: string
  ) {
    return this.applicationsService.remove(user.userId, id);
  }
}