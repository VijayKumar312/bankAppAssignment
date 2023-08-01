import {LuLogOut} from 'react-icons/lu'
import {MdCancel} from 'react-icons/md'
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import './index.scss'

function Logout({logoutState, setLogoutState}) {
    const onLogout=()=>{
        setLogoutState(false)
        Cookies.remove('BankUserToken')
        window.location.reload()
    }

  return (
    <Popup open={logoutState} onClose={setLogoutState} modal>
          {(close) => (
            <div className="logoutModalOverlay">
                <div className='logoutContent'>
                    <button className='logoutIcon'><LuLogOut /></button>
                    <div>
                        <h1>Are you sure want to Logout?</h1>
                        <div>
                            <button className='confirm' onClick={onLogout}>Yes, Logout</button>
                            <button className='cancel' onClick={close}>Cancel</button>
                        </div>
                    </div>
                    <button className='close' onClick={close} ><MdCancel /></button>
                </div>
            </div>
          )}
        </Popup>
  )
}

export default Logout

