import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CardDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	name: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	createdAt?: string

}
