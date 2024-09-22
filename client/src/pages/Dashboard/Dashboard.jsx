import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrescriptionBottle, faUserPlus, faDollarSign, faPills } from "@fortawesome/free-solid-svg-icons";
import { BarGraph } from '../../components/Charts/BarChart.jsx';
import { PieGraph } from '../../components/Charts/PieChart.jsx';

function dashboard() {
  return (
    <div className='h-[100%] pt-2 p-5 bg-blue-50'>
      
      {/* Title */}
      <div className='pb-5 text-[42px] font-bold text-[#0dccd6]'>Overview</div>

      {/* Cards Statistics */}
      <div className='w-full flex justify-between gap-10'>

        {/* Cards One */}
        <div className='flex-1 bg-blue-300 rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
          <div className='relative h-[100%] flex flex-col justify-center items-between'>
            <div className='pt-5 pb-3 pl-3 pr-3 z-1'>
              <h3>Total Prescriptions</h3>
              <h6>Prescriptions filled this month</h6>
              <div className='w-[30%] h-[2px] bg-[#0071bd] opacity-70 mt-2'></div>
              <p className='mt-5 text-[30px] font-bold'>850+</p>
            </div>
            <div className='absolute right-0 bottom-[3px]'>
              <FontAwesomeIcon icon={faPrescriptionBottle} className='text-[100px] text-[#0071bd] opacity-10'/>
            </div>
            <div className='w-[100%] h-[3px] bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div>
          </div>
        </div>

        {/* Card Two */}
        <div className='flex-1 bg-green-300 rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
          <div className='relative h-[100%] flex flex-col justify-center items-between'>
            <div className='pt-5 pb-3 pl-3 pr-3 z-1'>
              <h3>New Patients</h3>
              <h6>Patients registered this month</h6>
              <div className='w-[30%] h-[2px] bg-[#0071bd] opacity-70 mt-2'></div>
              <p className='mt-5 text-[30px] font-bold'>250+</p>
            </div>
            <div className='absolute right-0 bottom-[3px]'>
              <FontAwesomeIcon icon={faUserPlus} className='text-[100px] text-[#0071bd] opacity-10'/>
            </div>
            <div className='w-[100%] h-[3px] bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div>
          </div>
        </div>

        {/* Card Three */}
        <div className='flex-1 bg-pink-300 rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
          <div className='relative h-[100%] flex flex-col justify-center items-between'>
            <div className='pt-5 pb-3 pl-3 pr-3 z-1'>
              <h3>Inventory Stock</h3>
              <h6>Medication in stock</h6>
              <div className='w-[30%] h-[2px] bg-[#0071bd] opacity-70 mt-2'></div>
              <p className='mt-5 text-[30px] font-bold'>9500+</p>
            </div>
            <div className='absolute right-0 bottom-[3px]'>
              <FontAwesomeIcon icon={faPills} className='text-[100px] text-[#0071bd] opacity-10'/>
            </div>
            <div className='w-[100%] h-[3px] bg-gray-700 opacity-20'></div>
          </div>
        </div>

        {/* Card Four */}
        <div className='flex-1 bg-yellow-300 rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
          <div className='relative h-[100%] flex flex-col justify-center items-between'>
            <div className='pt-5 pb-3 pl-3 pr-3 z-1'>
              <h3>Sales Revenue</h3>
              <h6>Revenue generated this month</h6>
              <div className='w-[30%] h-[2px] bg-[#0071bd] opacity-70 mt-2'></div>
              <p className='mt-5 text-[30px] font-bold'>$38,467</p>
            </div>
            <div className='absolute right-0 bottom-[3px]'>
              <FontAwesomeIcon icon={faDollarSign} className='text-[100px] text-[#0071bd] opacity-10'/>
            </div>
            <div className='w-[100%] h-[3px] bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div>
          </div>
        </div>
      </div>

      {/* Charts Statistics */}
      <div className='pt-5 w-auto flex justify-between gap-10'>

        {/* Line Chart */}
        <div className='relative flex-grow basis-1/3 h-auto bg-white rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
          <BarGraph />
          <div className='absolute w-[100%] h-[3px] bottom-0 bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div>
        </div>

        {/* Pie Chart */}
        <div className='relative flex-1 h-auto bg-white rounded-[5px] overflow-hidden' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)'}}>
          <PieGraph />
          <div className='absolute w-[100%] h-[3px] bottom-0 bg-gray-700 opacity-20' style={{boxShadow: '0 15px 20px rgba(0, 0, 0, 0.05)'}}></div>
        </div>

      </div>
    </div>
  )
}

export default dashboard