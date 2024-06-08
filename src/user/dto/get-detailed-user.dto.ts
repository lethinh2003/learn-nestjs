import { IsNumberString } from 'class-validator';

export class GetDetailedUserDTO {
  @IsNumberString()
  id: number;
}
