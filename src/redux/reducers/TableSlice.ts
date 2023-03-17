import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetData } from "../../models/GetData";

interface UserProductState {
    data : IGetData[],
    changingItem: IGetData
}

const initialState: UserProductState = {
    data : [],
    changingItem: {
        companySigDate : '',
        companySignatureName : '',
        documentName : '',
        documentStatus : '',
        documentType : '',
        employeeNumber : '',
        employeeSigDate : '',
        employeeSignatureName : '',
    }
}

export const TableSlice = createSlice({
    name: 'data',
    initialState,
    reducers : {
        addItem(state, action : PayloadAction<IGetData>) {
            state.data.push(action.payload)
        },
        addItems(state, action : PayloadAction<IGetData[]>) {
            state.data = action.payload
        },
        addChangingItem(state, action : PayloadAction<IGetData>) {
            state.changingItem = action.payload
        },
        deleteChangingItem(state) {
            state.changingItem = initialState.changingItem
        },
        deleteItem(state, action : PayloadAction<string | undefined>) {
            state.data = state.data.filter(item => item.id != action.payload)
        },
    }
})

export default TableSlice.reducer