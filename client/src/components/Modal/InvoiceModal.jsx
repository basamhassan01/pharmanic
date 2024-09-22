import React from 'react'

function InvoiceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4">New Invoice</h2>
        <form>
          <div className="mb-4">
            <label className="block">Invoice ID</label>
            <input type="text" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="mb-4">
            <label className="block">Date</label>
            <input type="date" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="mb-4">
            <label className="block">Customer Name</label>
            <input type="text" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="mb-4">
            <label className="block">Medication</label>
            <input type="text" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="mb-4">
            <label className="block">Quantity</label>
            <input type="number" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="mb-4">
            <label className="block">Unit Price</label>
            <input type="number" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="mb-4">
            <label className="block">Total Price</label>
            <input type="number" className="border border-[#0B81C7] border-opacity-20 rounded w-full py-2 px-3" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-[#0B81C7] hover:bg-[#0dccd6] text-white px-4 py-2 rounded">
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvoiceModal