import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactions = this.find();

    const income = (await transactions).reduce((previous, current) => {
      if (current.type === 'income') {
        return previous + Number(current.value);
      }
      return previous;
    }, 0);

    const outcome = (await transactions).reduce((previous, current) => {
      if (current.type === 'outcome') {
        return previous + Number(current.value);
      }
      return previous;
    }, 0);
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }
}

export default TransactionsRepository;
