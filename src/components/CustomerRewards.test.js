import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerRewards from "./CustomerRewards";
import * as api from "../services/transactionApi";

jest.mock("../services/transactionApi");

const mockTransactions = [
  { customerId: 1, name: "Nutan", date: "2023-10-01", amount: 120 },
  { customerId: 1, name: "Nutan", date: "2023-10-15", amount: 80 },
  { customerId: 2, name: "Manu", date: "2023-11-01", amount: 200 },
];

describe("CustomerRewards Component", () => {
  test("displays loading state initially", () => {
    render(<CustomerRewards />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    api.fetchTransactions.mockRejectedValueOnce(new Error("Fetch failed"));
    render(<CustomerRewards />);
    await waitFor(() => {
      expect(screen.getByText("Failed to load transactions.")).toBeInTheDocument();
    });
  });

  test("renders rewards table with correct data", async () => {
    api.fetchTransactions.mockResolvedValueOnce(mockTransactions);
    render(<CustomerRewards />);

    await waitFor(() => {
      expect(screen.getByText("Customer Rewards")).toBeInTheDocument();
      expect(screen.getByText("Nutan")).toBeInTheDocument();});
  });
});
