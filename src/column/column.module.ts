import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColumnController } from './column.controller'
import { ColumnService } from './column.service'

@Module({
	controllers: [ColumnController],
	providers: [ColumnService, PrismaService],
	exports: [ColumnService]
})
export class ColumnModule {}
