import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ColumnDto } from './column.dto'
import { ColumnService } from './column.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('columns')
@Controller('user/columns')
export class ColumnController {
	constructor(private readonly columnService: ColumnService) {}

	@Get()
	async getAll() {
		return this.columnService.getAll()
	}

	@ApiBearerAuth()
	@Get('/by-user')
	@Auth()
	async getAllForUser(@CurrentUser('id') userId: string) {
		return this.columnService.getAllForUser(userId)
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: ColumnDto, @CurrentUser('id') userId: string) {
		return this.columnService.create(dto, userId)
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: ColumnDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.columnService.update(dto, id, userId)
	}

	@ApiBearerAuth()
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.columnService.delete(id)
	}
}
