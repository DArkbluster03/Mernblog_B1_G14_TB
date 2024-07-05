import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar  from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
export default function Dashboard() {
  
  return (
    <div>
      <div className="">
        <DashSidebar/>

      </div>
      {tab=='profile'&&<DashProfile/>}
    </div>
  )
}
