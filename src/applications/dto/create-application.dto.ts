import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { ApplicationStatus } from '../../generated/prisma/enums.js';

export class CreateApplicationDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: 'Frontend Engineer' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ enum: ApplicationStatus, default: ApplicationStatus.APPLIED, required: false })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @ApiProperty({ example: '2026-09-01', required: false })
  @IsOptional()
  @IsDateString()
  dateApplied?: string;

  @ApiProperty({ example: 'https://acme.com/careers/123', required: false })
  @IsOptional()
  @IsUrl()
  jobLink?: string;

  @ApiProperty({ example: '$120,000 - $140,000', required: false })
  @IsOptional()
  @IsString()
  salary?: string;

  @ApiProperty({ example: '2026-09-20', required: false })
  @IsOptional()
  @IsDateString()
  followUpDate?: string;

  @ApiProperty({ example: 'Referred by a friend, mention Q3 project.', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 'Sam Recruiter', required: false })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiProperty({ example: 'sam@acme.com', required: false })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({ example: '+6581234567', required: false })
  @IsOptional()
  @IsString()
  contactNumber?: string;
}
