import React, { useEffect, useState } from 'react'
import {CgProfile} from 'react-icons/cg'
import './index.scss'
import Loader from '../../../components/loader'

import { getUserData } from '../../../store/transactionSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
function Profile() {
    const {loginUserId, userData} = useSelector(state=>state.transaction)
    const {userProfile} = userData
    const [profileDetails, setProfileDetails] = useState({})
    const dispatch = useDispatch()

    useEffect(()=>{
      getAdminProfile()
      getRandomProfile()
    },[])
    let profileLink=''
    const getRandomProfile=()=>{
      const profileLists = ['profile1.png', 'profile2.webp', 'profile3.jpg', 'profile4.jpg', 'profile5.jpg']
      const randomNum = Math.ceil(Math.random()* profileLists.length)
      profileLink = profileLists[randomNum]
    }

    const getAdminProfile=async()=>{
        const url="https://bursting-gelding-24.hasura.app/api/rest/profile"
        const options={
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
              'x-hasura-role': 'admin',
            },
          }
          const response = await axios.get(url, options)
          const data = response.data.users.filter(item=>item.id === loginUserId)[0]
          console.log(data)
          setProfileDetails(data)
          dispatch(getUserData({...userData, userProfile: data}))
    }
    if(userProfile.length === 0){
      return <Loader />
    }
  return (
    <div className='profileTab'>
        <div className='largeScreen'>
            <img src={profileLink ? `/profile/${profileLink}` : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600w-1095249842.jpg'} alt='profile' className='profile' />
            <div className='profileDetails'>
                <div>
                    <h1>Your Name</h1>
                    <p>{userProfile.name}</p>
                    <h1>Email</h1>
                    <p>{userProfile.email}</p>
                    <h1>Date of Birth</h1>
                    <p>{userProfile.date_of_birth}</p>
                    <h1>Permanent Address</h1>
                    <p>{userProfile.permanent_address}</p>
                    <h1>Postal Code</h1>
                    <p>{userProfile.potal_code}</p>
                </div>
                <div>
                    <h1>User Name</h1>
                    <p>{profileDetails.name}</p>
                    <h1>Password</h1>
                    <p>******</p>
                    <h1>Present Address</h1>
                    <p>{userProfile.present_address ? userProfile.present_address : userProfile.permanent_address}</p>
                    <h1>City</h1>
                    <p>{profileDetails.city}</p>
                    <h1>Country</h1>
                    <p>USA</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile