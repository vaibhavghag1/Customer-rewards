/**
 * Calculates reward points for a based on transaction amount.
 */
export const calculatePoints = (amount) => {
    if (amount <= 50) return 0;
    if (amount <= 100) return amount - 50;
    return (amount - 100) * 2 + 50;
  };
  