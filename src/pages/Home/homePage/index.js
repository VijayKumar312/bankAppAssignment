import React, {useState} from 'react'
import './index.scss'
import Popup from 'reactjs-popup'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineMenu} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Sidebar from '../sidebar'
import Dashboard from '../Dashboard'
import TransactionsList from '../transactionsList'
import Profile from '../Profile'
import AddTransactionModal from '../../../popups/addTransaction'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const sidebarTabs=[{tab: 'Dashboard', imgLink: '/sidebarTabs/home.jpg'}, {tab: "Transactions", imgLink: '/sidebarTabs/transfer.jpg'}, {tab: 'Profile', imgLink: '/sidebarTabs/profile.jpg' }]

function HomePage(props) {
    const [activeTab, setActiveTab] = useState(sidebarTabs[0].tab)
    const [isMenuActive, setActiveMenu] = useState(false)
    const [addTransaction, setAddTransaction] = useState(false) 
    const {loginUserId} = useSelector(state=>state.transaction)

    const updateActiveTab=(tab)=>{
        setActiveTab(tab)
    }
    const updateAddTransaction=()=>{
      setAddTransaction(!addTransaction)
    }
    const onLogout=()=>{
      Cookies.remove('BankUserToken')
      window.location.reload()
    }
    const returnActiveTab = () => {
        switch (activeTab) {
          case 'Dashboard':
            return <Dashboard />;
          case 'Transactions':
            return <TransactionsList />;
          case 'Profile':
            return <Profile />;
          default:
            return null;
        }
      };
      
  return (
    <div className='homePage'>
        <Sidebar updateActiveTab={updateActiveTab} activeTab={activeTab} />
        <div className='header'>
            <div className='menuBar'>
                <button className='logoButton'>
                  <img src='/logo/logo.jpg' alt="logo" className='logo' />
                  <img src='/logo/Money Matters.png' alt="manMatters" />
                </button>
                <div>
                  <div className='logoutSection'>
                      <Popup
                        trigger={<button className='profile'><CgProfile /></button>}
                        position={'bottom center'}
                        on={'hover'}
                        closeOnDocumentClick
                      >
                        <div className='tooltip'>
                          <p>Name</p>
                          <p>Email</p>
                        </div>
                      </Popup>
                      <FiLogOut className='logout' onClick={onLogout} />
                  </div>
                  <button className='menuButton' onClick={()=>setActiveMenu(!isMenuActive)}><AiOutlineMenu /></button>
                </div>
            </div>
            <ul className={isMenuActive ? 'menuBarItems active' : 'menuBarItems inactive'}>
                  {
                    sidebarTabs.map(item=>(
                      <li key={item.tab} className={item.tab===activeTab && 'activeMenuTab'} onClick={()=>setActiveTab(item.tab)}>
                        <img src={item.imgLink} alt={item.tab} className="img" />
                        <p>{item.tab}</p>
                      </li>
                    ))
                  }
            </ul>
            <div className='addTransaction'><button onClick={()=>setAddTransaction(!addTransaction)}>+ Add Transaction</button></div>
        </div>
        <div className='contentDetails'>
            <navbar>
                <div>
                    <p>Account</p>
                    {loginUserId !== 3 && <button onClick={()=>setAddTransaction(!addTransaction)}>+ Add Transaction</button>}
                </div>
            </navbar>
            <div className='tabDetailsSection'>
              {
                  returnActiveTab()
              }
            </div>
            {addTransaction && <AddTransactionModal addTransaction={addTransaction} setAddTransaction={updateAddTransaction} />}
        </div>
    </div>
  )
}

export default HomePage