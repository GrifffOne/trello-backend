import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
	@ApiProperty({ required: false })
	@IsEmail()
	@IsOptional()
	email?: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	name?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password?: string
}
