import { useState, useEffect } from 'react';
import InvoiceTable from '../../components/Tables/InvoiceTable.jsx';
import InvoiceModal from '../../components/Modal/InvoiceModal';
import axios from 'axios';

function Invoice() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/invoices");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleInvoiceCreated = (newInvoice) => {
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
  };

  return (
    <div className="h-[full] min-h-[85vh] pt-2 p-5 bg-blue-50">
      {/* Title & Button */}
      <div className='pb-5 flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='text-[42px] font-bold text-[#0dccd6]'>Invoices Records</div>
        </div>
        <div className='flex items-center'>
          <button className="bg-[#0B81C7] text-white font-bold py-2 px-4 rounded hover:bg-[#0dccd6]" onClick={handleOpenModal}>Create New Invoice</button>
        </div>
      </div>

      {/* Table Component */}
      <div className='relative w-[100%] h-auto bg-white rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
        <div className="p-10">
          <InvoiceTable invoices={invoices} />
        </div>
        {/* <div className='absolute w-[100%] h-[3px] bottom-0 bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div> */}
      </div>

      {/* Invoice Form Modal */}
      <InvoiceModal isOpen={isModalOpen} onClose={handleCloseModal} onInvoiceCreated={handleInvoiceCreated} />
    </div>
  );
}

export default Invoice;