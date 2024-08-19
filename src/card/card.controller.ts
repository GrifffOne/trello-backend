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
import { CardDto } from './card.dto'
import { CardService } from './card.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('cards')
@Controller('user/cards')
export class CardController {
	constructor(private readonly cardService: CardService) {}

	@ApiBearerAuth()
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.cardService.getAll(userId)
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':columnId')
	@Auth()
	async create(
		@Body() dto: CardDto,
		@CurrentUser('id') userId: string,
		@Param('columnId') columnId: string
	) {
		return this.cardService.create(dto, userId, columnId)
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: CardDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.cardService.update(dto, id, userId)
	}

	@ApiBearerAuth()
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.cardService.delete(userId, id)
	}
}
