const router = require('express').Router();
let { ledger } = require('../../data/ledger.json');
const { getAccountBalance } = require('../../functions/transactions');

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

    // if enough funds then perform transaction

    // otherwise send insufficient funds response
}); 

// change account data to spend points 
router.put('/spend/:id', (req, res) => {
    const ledgerData = ledger;
    const balance = getAccountBalance(results,req.params.id)
    // test for funds in spending wallet
    
    // if enough funds then perform transaction
    
    // otherwise send insufficient funds response

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