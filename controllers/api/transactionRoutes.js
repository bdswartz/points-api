const router = require('express').Router();
let { ledger } = require('../../data/ledger.json');
const { getAccountBalance, spendTransaction, transferPoints } = require('../../functions/transactions');

// test server and data by getting all ledger data
router.get('/', (req, res) => {
    let ledgerData = ledger;
    res.json(ledgerData);
  });

// post a transfer from one wallet to another wallet
router.post('/transfer', (req, res) => {
    const ledgerData = ledger;
    const transfer = req.body
    // test for funds in credit wallet
    const balanceRemaining =  getAccountBalance(ledgerData,transfer.creditWalletId) - transfer.points
    // if enough funds then perform transaction
    if (balanceRemaining >= 0 ) {
        const results = transferPoints(ledgerData,transfer);
        res.json(results);
    }  
    // otherwise send insufficient funds response
    else {
        res.status(400).send('Not enough funds in Credit Wallet to complete the transaction')
    }
}); 

// change account data to spend points 
router.put('/spend/:id', (req, res) => {
    const ledgerData = ledger;
    const spend = req.body
    const creditWallet = req.params.id
    // test for funds in spending wallet
    const balanceRemaining =  getAccountBalance(ledgerData, creditWallet) - spend.points
      // if enough funds then perform transaction
    if (balanceRemaining >= 0 ) {
        const results = spendTransaction(ledgerData, spend.points, creditWallet);
        res.json(results);
        }  
    // otherwise send insufficient funds response
    else {
        res.status(400).send('Not enough funds in Credit Wallet to complete the transaction')
        }
});

//  get all balances and return to client
router.get('/balances', (req, res) => {
    const ledgerData = ledger;
    let balances = {}
    // create response object by cycling through key(walletId)/value(total points) pairs
    ledgerData.forEach(account => {
        balances[`${account.id}`] = getAccountBalance(ledgerData,account.id)
    });
    if (balances) {
        res.json(balances);
    } else {
        res.send(404);
    }
});



module.exports  = router;