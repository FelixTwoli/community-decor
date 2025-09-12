import { Payment } from '../entities/payment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto implements Omit<Payment, 'id' | 'createdAt'> {
  @ApiProperty({ description: 'The ID of the user making the payment' })
  userId: string;

  @ApiProperty({ description: 'The amount of the payment', type: Number })
  amount: number;

  @ApiProperty({ description: 'The currency of the payment (e.g., KES, USD)' })
  currency: string;

  @ApiProperty({
    description: 'The status of the payment (e.g., completed, pending)',
  })
  status: string;
}
