import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaFileDownload } from "react-icons/fa";
import InvoiceModal from "../Modal/InvoiceModal";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import './confirmAlertStyles.css'; // Adjust the path as needed

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false); // Overall loading state
  const [downloading, setDownloading] = useState(false); // State for download button
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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

  const handleDownloadInvoice = async (invoiceId) => {
    confirmAlert({
      title: 'Confirm to download',
      message: 'Would you like to download the invoice as a PDF?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setDownloading(invoiceId);
            try {
              const response = await axios.get(
                `http://localhost:3001/api/invoices/${invoiceId}/download`,
                { responseType: 'blob' } // Ensure we receive a binary blob
              );

              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `invoice-${invoiceId}.pdf`);
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            } catch (error) {
              console.log(error);
              alert('Failed to download invoice');
            } finally {
              setDownloading(null);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleDeleteInvoice = async (invoiceId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this invoice?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:3001/api/invoices/${invoiceId}`);
              setInvoices(invoices.filter(invoice => invoice.invoiceId !== invoiceId));
            } catch (error) {
              console.log(error);
              alert('Failed to delete invoice');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleApproveInvoice = async (invoiceId) => {
    confirmAlert({
      title: 'Confirm to approve',
      message: 'Are you sure you want to approve this invoice?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.patch(`http://localhost:3001/api/invoices/${invoiceId}/approve`);
              setInvoices(invoices.map(invoice => 
                invoice.invoiceId === invoiceId ? { ...invoice, approved: true } : invoice
              ));
            } catch (error) {
              console.log(error);
              alert('Failed to approve invoice');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);  
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
    setSelectedInvoice(null);  
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
            <th className="py-3 px-2 text-md text-left">Invoice ID</th>
            <th className="py-3 px-2 text-md text-left">Date</th>
            <th className="py-3 px-2 text-md text-left">Customer Name</th>
            <th className="py-3 px-2 text-md text-left">Phone Number</th>
            <th className="py-3 px-2 text-md text-left">Medication</th>
            <th className="py-3 px-2 text-md text-left">Quantity</th>
            <th className="py-3 px-2 text-md text-left">Total Price</th>
            <th className="py-3 px-2 text-md text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-blue-50">
          {loading ? (
            <tr>
              <td colSpan="7" className="py-4 text-center">
                <ClipLoader size={24} color={"#0B81C7"} loading={true} />
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr
                className="border-b border-[#0B81C7] border-opacity-10 hover:bg-blue-100"
                key={invoice._id} 
              >
                <td className="py-2 px-2 text-sm">{invoice.invoiceId}</td>
                <td className="py-2 px-2 text-sm">
                  {formatDate(invoice.date)}
                </td>
                <td className="py-2 px-2 text-sm">
                  {invoice.customerId ? invoice.customerId.fullName : "N/A"}
                </td>
                <td className="py-2 px-2 text-sm">{invoice.phoneNumber}</td>
                <td className="py-2 px-2 text-sm">{invoice.medication}</td>
                <td className="py-2 px-2 text-sm">{invoice.quantity}</td>
                <td className="py-2 px-2 text-sm">
                  ${invoice.unitPrice * invoice.quantity}
                </td>
                <td className="py-2 px-2 flex items-center gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit"
                    onClick={() => handleEditInvoice(invoice)} 
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                    onClick={() => handleDeleteInvoice(invoice.invoiceId)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleApproveInvoice(invoice.invoiceId)}
                    disabled={loading === invoice.invoiceId || invoice.approved}
                    className={`${
                      loading === invoice.invoiceId
                        ? "text-gray-400"
                        : "text-green-500 hover:text-green-600"
                    }`}
                    title="Approve"
                  >
                    {loading === invoice.invoiceId ? (
                      <ClipLoader size={16} color={"#0B81C7"} loading={true} />
                    ) : invoice.approved ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </button>
                  <button
                    className={`${
                      downloading === invoice.invoiceId
                        ? "text-gray-400"
                        : "text-yellow-500 hover:text-yellow-600"
                    }`}
                    onClick={() => handleDownloadInvoice(invoice.invoiceId)}
                    title="Download Invoice"
                  >
                    {downloading === invoice.invoiceId ? (
                      <ClipLoader size={16} color={"#0B81C7"} loading={true} />
                    ) : (
                      <FaFileDownload />
                    )}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <InvoiceModal isOpen={isModalOpen} onClose={handleCloseModal} invoiceToEdit={selectedInvoice} />
    </div>
  );
}

export default InvoiceTable;