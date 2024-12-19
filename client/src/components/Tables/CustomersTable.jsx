import React from "react";

function CustomersTable() {
  return (
    <div>
      <table className="w-[100%]">
        {/* Table Headings */}
        <thead>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
            <th className="py-3 px-2 text-md text-left">Customer ID</th>
            <th className="py-3 px-2 text-md text-left">Full Name</th>
            <th className="py-3 px-2 text-md text-left">Age</th>
            <th className="py-3 px-2 text-md text-left">Email</th>
          </tr>
        </thead>

        {/* Table Data */}
        <tbody className="bg-blue-50">
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T001</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Alexander John</td>
            <td className="py-2 px-2 text-sm">Aspirin</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T002</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Daniel Joseph</td>
            <td className="py-2 px-2 text-sm">Ibuprofen</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T003</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Michael Smith</td>
            <td className="py-2 px-2 text-sm">Amoxicillin</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T004</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Emily Johnson</td>
            <td className="py-2 px-2 text-sm">Aspirin</td>
          </tr>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">T005</th>
            <td className="py-2 px-2 text-sm">2024-09-01</td>
            <td className="py-2 px-2 text-sm">Thomas John</td>
            <td className="py-2 px-2 text-sm">Cetirizine</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;
