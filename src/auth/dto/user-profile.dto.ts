import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class UserProfileDto {
    @ApiProperty({ example: '6840a8a79dbb9222ecf43c04', description: 'Identificador único do usuário (geralmente o UUID ou ObjectId)' })
    sub: string

    @ApiProperty({ example: 'paulo@example.com', description: 'Endereço de e-mail do usuário' })
    email: string

    @ApiProperty({ example: '1749399536', description: 'Timestamp (Unix) de quando o token foi emitido (issued at)' })
    iat: number

    @ApiProperty({ example: '1749399536', description: 'Timestamp (Unix) de quando o token expira' })
    exp: number
}