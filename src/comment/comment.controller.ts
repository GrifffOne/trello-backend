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
import { CommentDto } from './comment.dto'
import { CommentService } from './comment.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('comments')
@Controller('user/comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@ApiBearerAuth()
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.commentService.getAll(userId)
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':cardId')
	@Auth()
	async create(
		@Body() dto: CommentDto,
		@CurrentUser('id') userId: string,
		@Param('cardId') cardId: string
	) {
		return this.commentService.create(dto, userId, cardId)
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: CommentDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.commentService.update(dto, id, userId)
	}

	@ApiBearerAuth()
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.commentService.delete(userId, id)
	}
}
