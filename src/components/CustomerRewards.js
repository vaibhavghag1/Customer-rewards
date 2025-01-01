import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../services/transactionApi";
import { calculatePoints } from "../utils/calculatePoints";

/**
 * Component to display customer rewards
 */
const CustomerRewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get initial data.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate each customer rewards based on transaction.
  const calculateCustomerRewards = () => {
    const rewards = {};
    transactions.forEach(({ customerId, name, date, amount }) => {
      let month = new Date(date).toLocaleString("default", { month: "long" });  // to get the month in text.
      let points = calculatePoints(amount);

      if (!rewards[customerId]) {
        rewards[customerId] = { name, monthly: {}, total: 0 };
      }

      // Calculate the total and monthly reward points of the customer.
      rewards[customerId].monthly[month] =
        (rewards[customerId].monthly[month] || 0) + points;
      rewards[customerId].total += points;
    });
    
    console.log("customer rewards ==> ",rewards)
    return rewards;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const rewards = calculateCustomerRewards();
  let months = [];


  // get individual months.
    transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "long" });
    if (!months.includes(month)) {
        months.push(month);
    }
    });

  return (
    <div>
      <h1>Customer Rewards</h1>
      <table border="2">
        <thead>
          <tr>
            <th>Customer Name</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rewards).map(([customerId, { name, monthly, total }]) => (
            <tr key={customerId}>
              <td>{name}</td>
              {months.map((month) => (
                <td key={month}>{monthly[month] || 0}</td>
              ))}
              <td>{total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerRewards;
