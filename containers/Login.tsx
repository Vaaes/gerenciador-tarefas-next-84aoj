import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { LoginRequest } from "../types/LoginRequest";
import { LoginResponse } from "../types/LoginResponse";
import { UserLogin } from '../components/UserLogin';
import { UserModal } from '../components/UserModal';
type LoginProps = {
    setToken(s: string) : void
}

export const Login : NextPage<LoginProps> = ({setToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userMsgError, setUserError] = useState('');
    const [msgUserSuccess, setMsgUserSuccess] = useState('');
    const closeModal = () => {
        setShowModal(false);
        setUserName('');
        setEmail('');
        setUserPassword('');
        setUserError('');
    }


    const doSave = async () => {
        try {
            if (!userName || !userEmail || !userPassword) {
                setUserError('favor preencher os dados');
                return;
            }

            setUserError('');

            const body = {
                name: userName,
                email: userEmail,
                password: userPassword
            };

            const result = await executeRequest('user', 'POST', body);
            if(result && result.data){
                setMsgUserSuccess('Usuário cadastrado com sucesso!')
                closeModal();
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setUserError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setUserError('Ocorreu erro ao criar um usuário, tente novamenete');
        }
    }

    return (
       <>
        <UserLogin 
            setToken={setToken}
            showModal={() => setShowModal(true)}
            login={login}
            password={password}
            msgError={msgError}
            msgUserSuccess={msgUserSuccess}
            setLogin={setLogin}
            setPassword={setPassword}
            setError={setError}
            setMsgUserSuccess={setMsgUserSuccess}
        />

        <UserModal 
            showModal={showModal}
            name={userName}
            email={userEmail}
            password={userPassword}
            errorMsg={userMsgError}
            closeModal={closeModal}
            doSave={doSave}
            setName={setUserName}
            setEmail={setEmail}
            setPassword={setUserPassword}
        />
    </> 
    )
}