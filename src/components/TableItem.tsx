import { IGetData } from "../models/GetData";
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../hooks/Redux";
import { TableSlice } from "../redux/reducers/TableSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TableItemProps {
    item : IGetData,
    onOpen : () => void
}

export function TableItem({item, onOpen} : TableItemProps) {

    const host = 'https://test.v5.pryaniky.com'
    const del = '/ru/data/v3/testmethods/docs/userdocs/delete/'

    const dispatch = useAppDispatch()
    const {addChangingItem, deleteItem} = TableSlice.actions
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    function changeTable() {
        dispatch(addChangingItem(item))
        onOpen()
    }

    async function deleteTable() {
        try {
            setError(false)
            const token = localStorage.getItem('token')
            const response = await axios.delete(host+del+item.id, {
                headers: {
                    "x-auth": token,
                }
                });
            if( response.data.error_code == 2004 ) {
                navigate('/login')
                return
            }
            dispatch(deleteItem(item.id))
        } catch (error) {
            setError(true)
        }
    }

    return(
        <>
        <form className="data-form" action="">
            {error && <p className="error-message">Ошибка!</p>}
            <FontAwesomeIcon onClick={deleteTable} className="icon trash" icon={faTrash}/>
            <FontAwesomeIcon onClick={changeTable} className="icon pen" icon={faPen}/>
            <ul className="pl-5 space-y-3 list-disc">
                <li>Company Signature Date: {item.companySigDate}</li>
                <li>Company Signature Name: {item.companySignatureName}</li>
                <li>Document Name: {item.documentName}</li>
                <li>Document Status: {item.documentStatus}</li>
                <li>Document Type: {item.documentType}</li>
                <li>Employee Number: {item.employeeNumber}</li>
                <li>Employee Signature Date: {item.employeeSigDate}</li>
                <li>Employee Signature Name: {item.employeeSignatureName}</li>
            </ul>
        </form>
        </>
    )
}