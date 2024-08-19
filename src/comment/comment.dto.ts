import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CommentDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	name: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	createdAt?: string
}
