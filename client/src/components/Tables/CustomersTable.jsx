import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import CustomerModal from "../Modal/CustomerModal";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import './confirmAlertStyles.css';

function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/customers")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this customer?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:3001/api/customers/${customerId}`);
              setCustomers(customers.filter(customer => customer._id !== customerId));
            } catch (error) {
              console.log(error);
              alert('Failed to delete customer');
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

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);  
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
    setSelectedCustomer(null);  
  };

  return (
    <div>
      <table className="w-[100%]">
        {/* Table Headings */}
        <thead>
          <tr className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-30">
            <th className="py-3 px-2 text-md text-left">Full Name</th>
            <th className="py-3 px-2 text-md text-left">Email</th>
            <th className="py-3 px-2 text-md text-left">Age</th>
            <th className="py-3 px-2 text-md text-left">Actions</th>
          </tr>
        </thead>

        {/* Table Data */}
        <tbody className="bg-blue-50">
          {loading ? (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                <ClipLoader color="#0B81C7" loading={loading} size={30} />
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer._id}
                className="border border-t border-b border-l-0 border-r-0 border-[#0B81C7] border-opacity-10 hover:bg-blue-100"
              >
                <td className="py-2 px-2 text-sm">{customer.fullName}</td>
                <td className="py-2 px-2 text-sm">{customer.email}</td>
                <td className="py-2 px-2 text-sm">{customer.age}</td>
                <td className="py-2 px-2 flex items-center gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit"
                    onClick={() => handleEditCustomer(customer)} 
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                    onClick={() => handleDeleteCustomer(customer._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <CustomerModal isOpen={isModalOpen} onClose={handleCloseModal} customerToEdit={selectedCustomer} />
    </div>
  );
}

export default CustomersTable;
