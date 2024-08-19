import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'


export class ColumnDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	name: string

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	createdAt?: string
}
