// import  { useEffect, useState } from "react";
// import axios from "axios";
// import { ClipLoader } from 'react-spinners'; 

// function InvoiceTable() {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(null); // Track the loading state for each invoice
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/invoices")
//       .then((invoice) => setInvoices(invoice.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // handling the approval process of the invoice
//   const handleApprove = async (invoiceId) => {
//     setLoading(invoiceId); 
//     try {
//       // Correct the endpoint to match your Express route
//       const response = await axios.patch(
//         `http://localhost:3001/api/invoices/${invoiceId}`
//       );
  
//       // Update the invoice state with the approved status
//       setInvoices((prevInvoices) => {
//         return prevInvoices.map((invoice) => {
//           if (invoice.invoiceId === invoiceId) {
//             return { ...invoice, approved: response.data.isApproved }; // Update the invoice status
//           }
//           return invoice; 
//         });
//       });
  
//       // Alert the user on success
//       alert(response.data.message);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to approve invoice");
//     }
//     finally {
//       setLoading(null); // Reset loading state after request is finished
//     }
//   };
  
//   return (
//     <div>
//       <table className="w-[100%]">
//         {/* Table Headings */}
//         <thead>
//           <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
//             <th className="py-3 px-2 text-md text-left">Invoice ID</th>
//             <th className="py-3 px-2 text-md text-left">Date</th>
//             <th className="py-3 px-2 text-md text-left">Customer Name</th>
//             <th className="py-3 px-2 text-md text-left">Medication</th>
//             <th className="py-3 px-2 text-md text-left">Quantity</th>
//             <th className="py-3 px-2 text-md text-left">Unit Price</th>
//             <th className="py-3 px-2 text-md text-left">Total Price</th>
//             <th className="py-3 px-2 text-md text-left">Action</th>
//           </tr>
//         </thead>

//         {/* Table Data */}
//         <tbody className="bg-blue-50">
//           {invoices.map((invoice) => {
//             const totalPrice = invoice.unitPrice * invoice.quantity;
//             return (
//               <tr
//                 className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100"
//                 key={invoice._id}
//               >
//                 <th className="py-2 px-2 text-md text-left">
//                   {invoice.invoiceId}
//                 </th>
//                 <td className="py-2 px-2 text-sm">
//                   {formatDate(invoice.date)}
//                 </td>
//                 <td className="py-2 px-2 text-sm">
//                   {invoice.customerId ? invoice.customerId.fullName : "N/A"}
//                 </td>
//                 <td className="py-2 px-2 text-sm">{invoice.medication}</td>
//                 <td className="py-2 px-2 text-sm">{invoice.quantity}</td>
//                 <td className="py-2 px-2 text-sm">
//                   ${invoice.unitPrice.toFixed(2)}
//                 </td>
//                 <td className="py-2 px-2 text-sm">${totalPrice.toFixed(2)}</td>
//                 <td className="py-2 px-2 flex gap-1">
//                   <button className="bg-[#0B81C7] text-sm text-white px-2 py-1 rounded hover:bg-[#0dccd6]">
//                     Edit
//                   </button>
//                   <button className="bg-red-500 text-sm text-white px-2 py-1 rounded hover:bg-red-600">
//                     Delete
//                   </button>

//                   {/* Approve Button */}
//                   <button
//                     onClick={() => handleApprove(invoice.invoiceId)}
//                     disabled={loading === invoice.invoiceId || invoice.approved}  // Disable if loading or already approved
//                     className={`text-sm px-2 py-1 rounded text-white ${
//                       loading === invoice.invoiceId ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     {loading === invoice.invoiceId ? (
//                       <ClipLoader size={16} color={"#ffffff"} loading={true} /> // Show spinner while loading
//                     ) : invoice.approved ? (
//                       "Approved"
//                     ) : (
//                       "Approve"
//                     )}
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InvoiceTable;


import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false); // Overall loading state

  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get("http://localhost:3001/api/invoices")
      .then((invoice) => setInvoices(invoice.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // End loading
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApprove = async (invoiceId) => {
    setLoading(invoiceId);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/invoices/${invoiceId}`
      );

      setInvoices((prevInvoices) => {
        return prevInvoices.map((invoice) => {
          if (invoice.invoiceId === invoiceId) {
            return { ...invoice, approved: response.data.isApproved };
          }
          return invoice;
        });
      });

      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to approve invoice");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <table className="w-[100%]">
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

        <tbody className="bg-blue-50">
          {loading ? (
            <tr>
              <td colSpan="8" className="py-4 text-center">
                <ClipLoader size={24} color={"#0B81C7"} loading={true} />
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => {
              const totalPrice = invoice.unitPrice * invoice.quantity;
              return (
                <tr
                  className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100"
                  key={invoice._id}
                >
                  <th className="py-2 px-2 text-md text-left">
                    {invoice.invoiceId}
                  </th>
                  <td className="py-2 px-2 text-sm">{formatDate(invoice.date)}</td>
                  <td className="py-2 px-2 text-sm">
                    {invoice.customerId ? invoice.customerId.fullName : "N/A"}
                  </td>
                  <td className="py-2 px-2 text-sm">{invoice.medication}</td>
                  <td className="py-2 px-2 text-sm">{invoice.quantity}</td>
                  <td className="py-2 px-2 text-sm">
                    ${invoice.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 text-sm">${totalPrice.toFixed(2)}</td>
                  <td className="py-2 px-2 flex gap-1">
                    <button className="bg-[#0B81C7] text-sm text-white px-2 py-1 rounded hover:bg-[#0dccd6]">
                      Edit
                    </button>
                    <button className="bg-red-500 text-sm text-white px-2 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                    <button
                      onClick={() => handleApprove(invoice.invoiceId)}
                      disabled={
                        loading === invoice.invoiceId || invoice.approved
                      }
                      className={`text-sm px-2 py-1 rounded text-white ${
                        loading === invoice.invoiceId
                          ? "bg-gray-400"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {loading === invoice.invoiceId ? (
                        <ClipLoader
                          size={16}
                          color={"#ffffff"}
                          loading={true}
                        />
                      ) : invoice.approved ? (
                        "Approved"
                      ) : (
                        "Approve"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTable;
