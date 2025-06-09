import { ApiProperty } from "@nestjs/swagger";

export class UserProfileDto{
    @ApiProperty({example: '6840a8a79dbb9222ecf43c04'})
    sub: string

    @ApiProperty({example: 'paulo@example.com'})
    email: string

    @ApiProperty({example: '1749399536'})
    iat: number

    @ApiProperty({example: '1749399536'})
    exp: number
}