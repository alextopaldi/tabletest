import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Login() {

    const host = 'https://test.v5.pryaniky.com'
    const login = '/ru/data/v3/testmethods/docs/login'
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)

    async function loginUser() {
        try {
            setLoader(true)
            setError(false)
            const response = await axios.post(host+login, userValues);
            const { token } = response.data.data;
            localStorage.setItem('token', token);
            navigate('/')
            setLoader(false)
            return token;
        } catch (error) {
            setLoader(false)
            setError(true)
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
            <button>
                {!loader && <p>Войти</p>}
                {loader && <FontAwesomeIcon className="animate-spin" icon={faCircleNotch}/>}
            </button>
            {error && <p className="error-message">Неверное имя пользователя или пароль</p>}
            
        </form>
        </>
    )
}