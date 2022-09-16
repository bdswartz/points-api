# Points Management API Server

#### This is a basic Node.js/Express.js backend API server with endpoints to manage Small World Points balances, point transfers between accounts, and spending of points by account owners.

---

#### Collaborators:

- [Brian Swartz](https://github.com/bdswartz)

---

## Installation

This application is not deployed to the internet and therefore is to be run locally

1.  Navigate to the folder in which you would like the application folder to reside and clone the GitHub repository for this application using the following command in the terminal: git clone https://github.com/bdswartz/points-api.git
2.  Navigate to the points-api folder (created in step 1) in the terminal and run the following command. npm install (or npm i) to install the dependency package as contained in the package.json
3.  Start the app in development mode on your local machine using the following terminal command: npm start.

---

## Usage

The easiest way to interact with this application once the server is running is to use your favorite API creation desktop software (ie [Insomnia](https://docs.insomnia.rest/) to create the API calls needed to interact with the backend API endpoints.

Server Endpoints Included (endpoint uri based on the server running locally)

See All Account Balances.
Method: Get
URI: localhost:3001/api/balances

Spend from User's Points Account
Method: Put
URI: localhost:3001/api/spend/-User's Account Number-

```
{
  "points": 5000
}
```

Transfer from one User's Account to another User's Account
Method: Post
Body (JSON):

```
{
"creditWalletId": "8c18b5bf-0171-4918-a611-bde754382f7a",

"debitWalletId": "363a3f19-7fa9-4e34-851d-6e42ef92a285",

"points": 300,

"timestamp": "2021-10-31T10:00:00Z"
}
```

The application features an initial ledger.json file in the \data folder. Since the API calls to this server will modify the ledger.json file, there is a copy provided that saves the initial state of the data in case the sequence of calls needs to be re-started. Simply copy the json from the ledger copy file and paste over the json in the ledger file.

- ***

## Technologies

> <b>Development Tools:</b>

- [express.js](https://expressjs.com/)

---

## Questions

Please visit my GitHub page
at https://github.com/bdswartz

If there are any questions about the project,
feel free to open an issue or contact me at briandswartz@outlook.com
