import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkTransaction = await transactionsRepository.findOne(id);

    if (!checkTransaction) {
      throw new AppError('Transaction não existente!');
    }
    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
