import { Sidebar } from "flowbite-react"
import {HiUser,HiArrowSmRight} from 'react-icons/hi';
import { useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
const location=useLocation()
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFormUrl=urlParams.get('tab');
   
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <Sidebar>
        <Sidebar.Item>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>
             Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} label={'User'} classname='cursor-pointer'>
             Profile
            </Sidebar.Item>


            </Sidebar.ItemGroup>
          
        </Sidebar.Item>
    </Sidebar>
  )
}
