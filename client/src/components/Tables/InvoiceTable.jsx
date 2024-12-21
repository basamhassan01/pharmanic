import React, { useEffect, useState } from "react";
import axios from "axios";

function InvoiceTable() {
  const [invoices, setInvoices] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/api/invoices')
    .then(invoice => setInvoices(invoice.data))
    .catch(err => console.log(err))
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <table className="w-[100%]">
        {/* Table Headings */}
        <thead>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
            <th className="py-3 px-2 text-md text-left">Invoice ID</th>
            <th className="py-3 px-2 text-md text-left">Date</th>
            <th className="py-3 px-2 text-md text-left">Customer Name</th>
            <th className="py-3 px-2 text-md text-left">Medication</th>
            <th className="py-3 px-2 text-md text-left">Quantity</th>
            <th className="py-3 px-2 text-md text-left">Unit Price</th>
            <th className="py-3 px-2 text-md text-left">Total Price</th>
            <th className="py-3 px-2 text-md text-left">Action</th>
          </tr>
        </thead>

        {/* Table Data */}
        <tbody className="bg-blue-50">
          {
          invoices.map(invoice => {
            const totalPrice = invoice.unitPrice * invoice.quantity;
            return (
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100">
            <th className="py-2 px-2 text-md text-left">{invoice.invoiceId}</th>
            <td className="py-2 px-2 text-sm">{formatDate(invoice.date)}</td>
            <td className="py-2 px-2 text-sm">{invoice.customerId ? invoice.customerId.fullName : "N/A"}</td>
            <td className="py-2 px-2 text-sm">{invoice.medication}</td>
            <td className="py-2 px-2 text-sm">{invoice.quantity}</td>
            <td className="py-2 px-2 text-sm">${invoice.unitPrice.toFixed(2)}</td>
            <td className="py-2 px-2 text-sm">${totalPrice.toFixed(2)}</td>
            <td class="py-2 px-2 flex gap-1">
                <button className="bg-[#0B81C7] text-sm text-white px-2 py-1 rounded hover:bg-[#0dccd6]">Edit</button>
                <button className="bg-red-500 text-sm text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;
