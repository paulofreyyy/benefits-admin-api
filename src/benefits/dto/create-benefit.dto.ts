import { ApiProperty } from "@nestjs/swagger";

export class CreateBenefitDto {
    @ApiProperty({example: 'Vale alimentação', description: 'Título do benefício'})
    name: string;
    
    @ApiProperty({example: 'Saldo destinado para alimentação (Mercado)', description: 'Descrição do benefício'})
    description: string;
}