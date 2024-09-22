import React from "react";

function TransactionTable() {
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
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T001</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Alexander John</td>
            <td className="py-2 px-2 text-sm">Aspirin</td>
            <td className="py-2 px-2 text-sm">2</td>
            <td className="py-2 px-2 text-sm">$10.00</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T002</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Daniel Joseph</td>
            <td className="py-2 px-2 text-sm">Ibuprofen</td>
            <td className="py-2 px-2 text-sm">1</td>
            <td className="py-2 px-2 text-sm">$5.00</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T003</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Michael Smith</td>
            <td className="py-2 px-2 text-sm">Amoxicillin</td>
            <td className="py-2 px-2 text-sm">5</td>
            <td className="py-2 px-2 text-sm">$25.00</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T004</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Emily Johnson</td>
            <td className="py-2 px-2 text-sm">Aspirin</td>
            <td className="py-2 px-2 text-sm">7</td>
            <td className="py-2 px-2 text-sm">$35.00</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T005</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Thomas John</td>
            <td className="py-2 px-2 text-sm">Cetirizine</td>
            <td className="py-2 px-2 text-sm">2</td>
            <td className="py-2 px-2 text-sm">$10.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
