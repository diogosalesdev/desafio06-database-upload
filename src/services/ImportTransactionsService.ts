import fs from 'fs';
import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';
import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute(path: string): Promise<Transaction[]> {
    // TODO
    const createTransaction = new CreateTransactionService();

    const checkFile = fs.promises.stat(path);
    if (!checkFile) {
      throw new AppError('Falha no arquivo!');
    }
    const file = fs.readFileSync(path, 'utf-8');

    const fileLinesWithTitle = file.split('\n');

    const fileLines = fileLinesWithTitle.splice(1, fileLinesWithTitle.length);

    const fileLinesFiltered = fileLines.filter(line => line !== '');

    const rawTransactions = fileLinesFiltered.map(line => {
      const values = line.split(', ');
      const transaction: RequestDTO = {
        title: values[0],
        type: values[1] === 'income' ? 'income' : 'outcome',
        value: Number(values[2]),
        category: values[3],
      };
      return transaction;
    });
    const transactions: Transaction[] = [];
    for (const transaction of rawTransactions) {
      const createdTransaction = await createTransaction.execute(transaction);
      transactions.push(createdTransaction);
    }
    return transactions;
  }
}

export default ImportTransactionsService;
