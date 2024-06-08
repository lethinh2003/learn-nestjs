import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email không hợp lệ',
    },
  )
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short. It should be at least 8 characters.',
  })
  password: string;

  @IsBoolean()
  isActive: boolean = true;
}
