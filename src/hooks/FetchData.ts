import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableSlice } from "../redux/reducers/TableSlice";

export function useFetchData() {

    const host = 'https://test.v5.pryaniky.com'
    const get = '/ru/data/v3/testmethods/docs/userdocs/get'

    const dispatch = useDispatch()
    const {addItems} = TableSlice.actions
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    async function getInfo() {
        try {
            setLoader(true)
            const token = localStorage.getItem('token')
            const response = await axios.get(host+get, {
              headers: {
                "x-auth": token,
              }
              });
            if( response.data.error_code == 2004 ) {
                navigate('/login')
                return
            }
            dispatch(addItems(response.data.data))
            setLoader(false)
            setError(false)
        } catch (error) {
            console.log(error)
            setLoader(false)
            setError(true)
        }
      }

    return { getInfo, loader, error }
}