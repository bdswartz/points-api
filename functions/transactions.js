
const transferPoints = () => {
    
  };

const spendTransaction = () => {

}

const getAccountBalance = (ledgerData,accountId) => {
  const result = ledgerData.filter( account => account.id === accountId);
  const accountTransactions = result[0].transactions
  let balance = 0
  accountTransactions.forEach(transaction => {
      balance += transaction.points
  });
  return balance;
};

module.exports = {
  getAccountBalance,
  transferPoints,
  spendTransaction
};