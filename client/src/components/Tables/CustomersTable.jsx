import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomersTable() {
  const [customers, setCustomers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/api/customers')
    .then(customer => setCustomers(customer.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <table className="w-[100%]">
        {/* Table Headings */}
        <thead>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
            <th className="py-3 px-2 text-md text-left">Full Name</th>
            <th className="py-3 px-2 text-md text-left">Email</th>
            <th className="py-3 px-2 text-md text-left">Age</th>
          </tr>
        </thead>

        {/* Table Data */}
        <tbody className="bg-blue-50">
          { customers.map(customer => {
            return (
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <td className="py-2 px-2 text-sm">{customer.fullName}</td>
            <td className="py-2 px-2 text-sm">{customer.email}</td>
            <td className="py-2 px-2 text-sm">{customer.age}</td>
          </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;