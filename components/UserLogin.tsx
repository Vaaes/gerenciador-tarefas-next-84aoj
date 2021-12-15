import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { LoginRequest } from "../types/LoginRequest";
import { LoginResponse } from "../types/LoginResponse";
import { UserModal } from '../components/UserModal';

type UserLoginProps = {
    setToken(s: string) : void
    showModal() : void
    login : string,
    password : string,
    msgError : string,
    msgUserSuccess: string,

    setLogin(s : string) : void
    setPassword(s : string) : void
    setError(s : string) : void
    setMsgUserSuccess(s : string) : void
}

export const UserLogin : NextPage<UserLoginProps> = ({ 
    setToken,
    showModal,
    login,
    password,
    msgError,
    msgUserSuccess,

    setLogin,
    setPassword,
    setError,
    setMsgUserSuccess,
 }) => {


    const doLogin = async () => {
        try {
            setMsgUserSuccess('');
            if (!login || !password) {
                setError('favor preencher os dados');
                return;
            }

            setError('');

            const body = {
                login,
                password
            };

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
                const loginResponse = result.data as LoginResponse;
                localStorage.setItem('accessToken', loginResponse.token);
                localStorage.setItem('userName', loginResponse.name);
                localStorage.setItem('userEmail', loginResponse.email);
                setToken(loginResponse.token);
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar login, tente novamenete');
        }
    }

    return (
        
    <div className="container-login">
        <img src="/logo.svg" alt="Logo Fiap" className="logo" />
        <div className="form">
            {msgError && <p>{msgError}</p>}
            {msgUserSuccess && <p className="p-success">{msgUserSuccess}</p>}
            <div className="input">
                <img src="/mail.svg" alt="Informe seu email" />
                <input type="text" placeholder="Informe seu email"
                    value={login} onChange={evento => setLogin(evento.target.value)} />
            </div>
            <div className="input">
                <img src="/lock.svg" alt="Informe sua senha" />
                <input type="password" placeholder="Informe sua senha"
                    value={password} onChange={evento => setPassword(evento.target.value)} />
            </div>
            <button onClick={doLogin}>Login</button>
            <button className="button-register" onClick={showModal}>Cadastrar-se</button>
        </div>
    </div>

    );
}
