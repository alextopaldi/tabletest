import axios from "axios";
import { useState } from "react"

export function Login() {

    const host = 'https://test.v5.pryaniky.com'
    const login = '/ru/data/v3/testmethods/docs/login'

    async function loginUser() {
        try {
            const response = await axios.post(host+login, userValues);
            const { token } = response.data.data;
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            console.log(error)
        }
    }

    function submitHandler(event : React.FormEvent) {
        event.preventDefault()
        loginUser()
    }
    
    const [userValues, setUserValues] = useState({
    login : '',
    password : ''
    })

    return(
        <>
        <form className="login-form" onSubmit={submitHandler} action="">
            <input value={userValues.login} onChange={event => (setUserValues(prev =>({...prev, login: event.target.value})))} placeholder='Login' type="text"/>
            <input value={userValues.password} onChange={event => (setUserValues(prev =>({...prev, password: event.target.value})))} placeholder='Password' type="password"/>
            <button>Login</button>
        </form>
        </>
    )
}