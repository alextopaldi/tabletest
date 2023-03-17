import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/Redux"
import { IGetData } from "../models/GetData"
import { TableSlice } from "../redux/reducers/TableSlice"
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"

interface ChangeItemProps {
    onClose : () => void
}

export function ChangeItem({onClose} : ChangeItemProps) {

    const host = 'https://test.v5.pryaniky.com'
    const set = '/ru/data/v3/testmethods/docs/userdocs/set/'

    const {changingItem} = useAppSelector(state => state.TableSlice)

    const [addValues, setAddValues] = useState<IGetData>({
        companySigDate : changingItem.companySigDate,
        companySignatureName : changingItem.companySignatureName,
        documentName : changingItem.documentName,
        documentStatus : changingItem.documentStatus,
        documentType : changingItem.documentType,
        employeeNumber : changingItem.employeeNumber,
        employeeSigDate : changingItem.employeeSigDate,
        employeeSignatureName : changingItem.employeeSignatureName,
    })
    const [loader, setLoader] = useState(false)
    const [errorDate, setErrorDate] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useAppDispatch()

    const {deleteItem, addItem} = TableSlice.actions
    const navigate = useNavigate()

    async function changeItem(event : React.FormEvent) {
        event.preventDefault()
        try {
            setErrorDate(false)
            setError(false)
            setLoader(true)
            const token = localStorage.getItem('token')
            const response = await axios.post(host+set+changingItem.id, addValues, {
                headers: {
                "x-auth": token,
                }
                });
            if( response.data.error_code == 2004 ) {
                navigate('/login')
                return
            }
            dispatch(deleteItem(changingItem.id))
            dispatch(addItem(response.data.data))
            setLoader(false)
            onClose()
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                setErrorDate(true)
                setLoader(false)
                return
              }
            else {
                setError(true)
                setLoader(false)
            }
        }
    }
    
    return(
        <>
        <form onSubmit={changeItem} className="add-item-form" action="">
            <input onClick={() => setErrorDate(false)} required value={addValues.companySigDate} onChange={event => setAddValues(prev => ({...prev, companySigDate: event.target.value}))} type="text" onFocus={(e) => (e.currentTarget.type = 'datetime-local')} placeholder="Company Signature Date..." />
            <input required value={addValues.companySignatureName} onChange={event => setAddValues(prev => ({...prev, companySignatureName: event.target.value}))} type="text" placeholder="Company Signature Name..." />
            <input required value={addValues.documentName} onChange={event => setAddValues(prev => ({...prev, documentName: event.target.value}))} type="text" placeholder="Document Name..." />
            <input required value={addValues.documentStatus} onChange={event => setAddValues(prev => ({...prev, documentStatus: event.target.value}))} type="text" placeholder="Document Status..." />
            <input required value={addValues.documentType} onChange={event => setAddValues(prev => ({...prev, documentType: event.target.value}))} type="text" placeholder="Document Type..." />
            <input required value={addValues.employeeNumber} onChange={event => setAddValues(prev => ({...prev, employeeNumber: event.target.value}))} type="text" placeholder="Employee Number..." />
            <input onClick={() => setErrorDate(false)} required value={addValues.employeeSigDate} onChange={event => setAddValues(prev => ({...prev, employeeSigDate: event.target.value}))} type="text" onFocus={(e) => (e.currentTarget.type = 'datetime-local')} placeholder="Employee Signature Date..." />
            <input required value={addValues.employeeSignatureName} onChange={event => setAddValues(prev => ({...prev, employeeSignatureName: event.target.value}))} type="text" placeholder="Employee Signature Name..." />
            <button disabled={loader}>
                {!loader && <p>Save</p>}
                {loader && <FontAwesomeIcon className="animate-spin" icon={faCircleNotch}/>}
            </button>
            {errorDate && <p className="error-message">Введите корректную дату!</p>}
            {error && <p className="error-message">Ошибка отправки данных!</p>}
        </form>
        </>
    )
}