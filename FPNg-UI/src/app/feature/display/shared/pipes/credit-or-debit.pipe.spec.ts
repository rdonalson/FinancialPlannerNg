import { CreditOrDebitPipe } from './credit-or-debit.pipe';

describe('CreditOrDebitPipe', () => {
  it('create an instance', () => {
    const pipe = new CreditOrDebitPipe();
    expect(pipe).toBeTruthy();
  });
});
