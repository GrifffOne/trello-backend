import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColumnDto } from './column.dto'

@Injectable()
export class ColumnService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.column.findMany({
			include: {
				card: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})
	}

	async getAllForUser(userId: string) {
		return this.prisma.column.findMany({
			where: {
				userId
			},
			include: {
				card: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})
	}

	async create(dto: ColumnDto, userId: string) {
		return this.prisma.column.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async update(dto: Partial<ColumnDto>, columnId: string, userId: string) {
		return this.prisma.column.update({
			where: {
				userId,
				id: columnId
			},
			data: dto
		})
	}

	async delete(columnId: string) {
		return this.prisma.column.delete({
			where: {
				id: columnId
			}
		})
	}
}
