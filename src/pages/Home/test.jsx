import React from 'react'
import axios from 'axios';

function Test() {
    const limit = 100;
    let offset = 0;
    let allData = [];
    const getAllData=async()=>{
            const url=`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`
            const options={
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
                  'x-hasura-role': 'admin',
                },
              }
            const response = await axios.get(url, options);
            const data = response.data;
            console.log(data)
        // while(true){
        //     const url=`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`
        //     const options={
        //         headers: {
        //           accept: 'application/json',
        //           'Content-Type': 'application/json',
        //           'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        //           'x-hasura-role': 'admin',
        //         },
        //       }
        //     const response = await axios.get(url, options);
        //     const data = response.data;
        //     if (data.length === 0) {
        //         // Break the loop if the response is empty (no more data to fetch)
        //         break;
        //     }
        //     allData = allData.concat(data);
        //     offset += limit;
        // }
        
        console.log(allData)
    }
    getAllData()
  return (
    <div>test</div>
  )
}

export default Test

