import CustomersTable from "../../components/Tables/CustomersTable.jsx";

function Customers() {
  return (
    <div className="h-[100%] pt-2 p-5 bg-blue-50">
      {/* Title */}
      <div className='pb-5 text-[42px] font-bold text-[#0dccd6]'>Customers Details</div>

      {/* Table Component */}
      <div className='relative w-[100%] h-auto bg-white rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
        <div className="p-10">
          <CustomersTable />
        </div>
        <div className='absolute w-[100%] h-[3px] bottom-0 bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div>
      </div>
    </div>
  );
}

export default Customers;
