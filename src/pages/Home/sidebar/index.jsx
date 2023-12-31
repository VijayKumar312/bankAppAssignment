import React, {useState} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import Logout from "../../../popups/logout"
import './index.scss'
import { useSelector } from 'react-redux'

const sidebarTabs=[{tab: 'Dashboard', imgLink: '/sidebarTabs/home.jpg'}, {tab: 'Transactions', imgLink: '/sidebarTabs/transfer.jpg'}, {tab: 'Profile', imgLink: '/sidebarTabs/profile.jpg'}]

function Sidebar({updateActiveTab, activeTab}) {
    const [logoutState, setLogout] = useState(false)
    const {loginUserId, userData} = useSelector((state)=>state.transaction)
    const {userProfile} = userData 
    
    const setActiveTab=(tab)=>{
        updateActiveTab(tab)
    }
    const setLogoutState=()=>{
        setLogout(!logoutState)
    }
    
  return (
    <div className='sidebar'>
            <div className='navbar'>
                <img src='/logo/logo.jpg' alt='logo' className='logo' />
                <img src='/logo/Money Matters.png' alt='' className='manMatters' />
            </div>
            <div className='tabsSection'>
                <ul className='sidebarTabs'>
                    {sidebarTabs.map(item=>(
                    <li key={item.tab} className={item.tab===activeTab && 'activeTab'} onClick={()=>setActiveTab(item.tab)}>
                        <img src={item.imgLink} alt={item.tab} />
                        {(loginUserId === 3 && item.tab==='Transactions') ? (<p>All Transactions</p>) : <p>{item.tab}</p> }
                    </li>
                    ))}
                </ul>
                <button className='logoutSection' onClick={()=>{setLogout(!logoutState)}}>
                    <img src='/Avatar.png' alt='adminProfile' />
                    <div>
                        <p>{userProfile.name}</p>
                        <p>{userProfile.email}</p>
                    </div>
                    <FiLogOut className='logoutIcon' />
                </button>
            </div>
            {logoutState && <Logout logoutState={logoutState} setLogoutState={setLogoutState} /> }
        </div>
  )
}

export default Sidebar