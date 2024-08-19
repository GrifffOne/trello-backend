import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CommentDto } from './comment.dto'

@Injectable()
export class CommentService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.comment.findMany({
			where: {
				userId
			}
		})
	}

	async create(dto: CommentDto, userId: string, cardId: string) {
		return this.prisma.comment.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				},
				card: {
					connect: {
						id: cardId
					}
				}
			}
		})
	}

	async update(dto: Partial<CommentDto>, commentId: string, userId: string) {
		return this.prisma.comment.update({
			where: {
				userId,
				id: commentId
			},
			data: dto
		})
	}

	async delete(userId: string, commentId: string) {
		const card = await this.prisma.comment.findUnique({
			where: {
				userId,
				id: commentId
			}
		})

		if (!card) throw new NotFoundException('Comment not found')

		return await this.prisma.comment.delete({
			where: {
				userId,
				id: commentId
			}
		})
	}
}
