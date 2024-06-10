import { IsNumberString } from 'class-validator';

export class GetAllUserQueryDto {
  @IsNumberString()
  page: number;
  @IsNumberString()
  pageSize: number;
}
