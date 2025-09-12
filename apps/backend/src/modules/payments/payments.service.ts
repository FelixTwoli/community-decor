import { Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  private payments: Payment[] = [
    {
      id: 'pay1',
      userId: 'u1',
      amount: 50,
      currency: 'KES',
      status: 'completed',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Payment[] {
    return this.payments;
  }

  findOne(id: string): Payment | undefined {
    return this.payments.find((p) => p.id === id);
  }

  create(createPaymentDto: CreatePaymentDto): Payment {
    const newPayment: Payment = {
      id: `pay${this.payments.length + 1}`,
      createdAt: new Date().toISOString(),
      ...createPaymentDto,
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto): Payment | null {
    const payment = this.findOne(id);
    if (!payment) return null;
    Object.assign(payment, updatePaymentDto);
    return payment;
  }

  remove(id: string): { deleted: boolean } {
    this.payments = this.payments.filter((p) => p.id !== id);
    return { deleted: true };
  }
}
