const fs = require("fs");
const path = require("path");

const transferPoints = (ledgerData, transfer) => {
  // get the account information for the debit account
  let accountData = ledgerData.filter( account => account.id === transfer.debitWalletId);
  // hold the index so that the account can be updated
  const index = ledgerData.indexOf(accountData[0]);
  // push the new transfer into the debit account
  accountData[0].transactions.push({
      creditWalletId: transfer.creditWalletId,
      points: transfer.points,
      timestamp: transfer.timestamp
  });
  // update the ledger data
  ledgerData[index]=accountData[0];
  // execute a spend transaction on the credit account and update ledger data file
  spendTransaction(ledgerData, transfer.points, transfer.creditWalletId);
  return accountData;
};


const spendTransaction = (ledgerData, points, creditAccount) => {
  // get the account information for the credit account
  let accountData = ledgerData.filter( account => account.id === creditAccount);
  // hold the index so that the account can be updated
  const index = ledgerData.indexOf(accountData[0]);
  // remove funds; oldest to newest
  const sortedHistory = accountData[0].transactions.sort((a, b) => {
    return (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)
    });
  let sumTransaction = 0
  let returnArray = [];
  let removedHistory = []
  while (sumTransaction<points) {
    removedHistory = sortedHistory.shift();
    sumTransaction += removedHistory.points;
    returnArray.push(removedHistory);
  }
  if (sumTransaction === points) {
    // replace original transaction history with post transaction history
    accountData[0].transactions = sortedHistory;
    // replace account data in ledger data
    ledgerData[index] = accountData[0];
    // call the write function to update data file for persistance
    writeToDataFile(ledgerData);
    // return the array that was built wit removed transactions (old to new)
    return returnArray
  }
  else {
    // remove last (overstated) transaction that was removed
    returnArray.pop();
    // push a new transaction with updated point total
    returnArray.push(
      {
        timestamp: removedHistory.timestamp,
        creditWalletId: removedHistory.creditWalletId,
        points: removedHistory.points - (sumTransaction - points)
      }
    )
    // update the remaining sorted history with the remaining points from final transaction
    sortedHistory.push({
          timestamp: removedHistory.timestamp,
          creditWalletId: removedHistory.creditWalletId,
          points: (sumTransaction - points)
        })
      // replace original transaction history with post transaction history
      accountData[0].transactions = sortedHistory;
      // replace account data in ledger data
      ledgerData[index] = accountData[0];
      // call the write function to update data file for persistance
      writeToDataFile(ledgerData);
      // return the array that was built wit removed transactions (old to new)
      return returnArray;
  }
};

const writeToDataFile = (ledger) => {
  // write to the ledger.json
  fs.writeFileSync(
  path.join(__dirname, '../data/ledger.json'),
  JSON.stringify({ ledger: ledger }, null, 2)
  );
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