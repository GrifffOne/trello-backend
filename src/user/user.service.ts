import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				column: {
					select: {
						id: true,
						name: true
					}
				},
				card: {
					select: {
						id: true,
						name: true
					}
				},
				comment: {
					select: {
						id: true,
						name: true
					}
				}
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		const totalCard = profile.comment.length
		const totalComment = profile.comment.length

		const { password, ...rest } = profile

		return {
			user: rest,
			statistics: [
				{ label: 'Completed cards', value: totalCard },
				{ label: 'Total comments', value: totalComment }
			]
		}
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async update(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: {
				id
			},
			data,
			select: {
				name: true,
				email: true
			}
		})
	}
}
