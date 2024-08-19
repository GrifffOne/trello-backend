import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CardDto } from './card.dto'

@Injectable()
export class CardService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.card.findMany({
			where: {
				userId
			}
		})
	}

	async create(dto: CardDto, userId: string, columnId: string) {
		return this.prisma.card.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				},
				column: {
					connect: {
						id: columnId
					}
				}
			}
		})
	}

	async update(dto: Partial<CardDto>, cardId: string, userId: string) {
		return this.prisma.card.update({
			where: {
				userId,
				id: cardId
			},
			data: dto
		})
	}

	async delete(userId: string, cardId: string) {
		const card = await this.prisma.card.findUnique({
			where: {
				userId,
				id: cardId
			}
		})

		if (!card) throw new NotFoundException('Card not found')

		return await this.prisma.card.delete({
			where: {
				userId,
				id: cardId
			}
		})
	}
}
