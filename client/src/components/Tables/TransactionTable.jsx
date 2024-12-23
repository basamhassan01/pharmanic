import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/transactions")
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <table className="w-[100%]">
        {/* Table Headings */}
        <thead>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
            <th className="py-3 px-2 text-md text-left">Transaction ID</th>
            <th className="py-3 px-2 text-md text-left">Date</th>
            <th className="py-3 px-2 text-md text-left">Customer Name</th>
            <th className="py-3 px-2 text-md text-left">Medication</th>
            <th className="py-3 px-2 text-md text-left">Quantity</th>
            <th className="py-3 px-2 text-md text-left">Total Price</th>
          </tr>
        </thead>

        {/* Table Data */}
        <tbody className="bg-blue-50">
          {loading ? (
            <tr>
              <td colSpan="6" className="py-4 text-center">
                <ClipLoader color="#0B81C7" loading={loading} size={30} />
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.transactionId}
                className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100"
              >
                <th className="py-2 px-2 text-md text-left">
                  {transaction.transactionId}
                </th>
                <td className="py-2 px-2 text-sm">
                  {formatDate(transaction.date)}
                </td>
                <td className="py-2 px-2 text-sm">
                  {transaction.customerId
                    ? transaction.customerId.fullName
                    : "N/A"}
                </td>
                <td className="py-2 px-2 text-sm">{transaction.medication}</td>
                <td className="py-2 px-2 text-sm">{transaction.quantity}</td>
                <td className="py-2 px-2 text-sm">
                  ${transaction.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
