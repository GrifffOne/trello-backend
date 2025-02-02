import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { ColumnModule } from './column/column.module'
import { CardModule } from './card/card.module'
import { CommentModule } from './comment/comment.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ColumnModule,
		CardModule,
		CommentModule
	]
})
export class AppModule {}
