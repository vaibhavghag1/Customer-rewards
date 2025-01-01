/**
 * API call to fetch transaction data from json file.
 */
export const fetchTransactions = () => {
    const transactions = require("../data/transactions.json");
    return new Promise((resolve) => {
      setTimeout(() => resolve(transactions), 1000);
    });
  };
  