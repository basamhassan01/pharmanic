import React, { useState } from "react";
import TransactionTable from "../../components/Tables/TransactionTable.jsx";
import TransactionModal from '../../components/Modal/TransactionModal.jsx'

function Transaction() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="h-[full] min-h-[85vh] pt-2 p-5 bg-blue-50">
      {/* Title */}
      <div className='pb-5 flex justify-between itmes-center'>
        <div className='flex items-center'>
        <div className='text-[42px] font-bold text-[#0dccd6]'>Transaction Records</div>
        </div>
        <div className='flex items-center'>
          <button className="bg-[#0B81C7] text-white font-bold py-2 px-4 rounded hover:bg-[#0dccd6]" onClick={handleOpenModal}>Create New Transaction</button>
        </div>
      </div>

      {/* Table Component */}
      <div className='relative w-[100%] h-auto bg-white rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
        <div className="p-10">
          <TransactionTable />
        </div>
        {/* <div className='absolute w-[100%] h-[3px] bottom-0 bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div> */}
      </div>

      {/* Invoice Form Modal */} 
      <TransactionModal isOpen={isModalOpen} onClose={handleCloseModal} />    
    </div>
  );
}

export default Transaction;
