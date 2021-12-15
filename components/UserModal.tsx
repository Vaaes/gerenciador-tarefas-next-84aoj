import { NextPage } from "next";
import {Modal} from 'react-bootstrap';
type UserModalProps = {
    showModal: boolean
    name : string,
    email : string
    password : string
    errorMsg : string
    closeModal() : void
    doSave() : void
    setName(s : string) : void
    setEmail(s : string) : void
    setPassword(s : string) : void
}

export const UserModal : NextPage<UserModalProps> = ({ 
    showModal,
    name,
    email,
    password,
    errorMsg,
    closeModal,
    doSave,
    setName,
    setEmail,
    setPassword
}) => {
    return (
        <Modal
            show={showModal}
            onHide={() => closeModal()}
            className="container-modal">
            <Modal.Body>
                    <p>Cadastrar novo usuário</p>
                    {errorMsg && <p className="error">{errorMsg}</p>}
                    <input type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <input type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
            </Modal.Body>
            <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={doSave}>Cadastrar</button>
                        <span onClick={() => closeModal()}>Cancelar</span>
                    </div>
            </Modal.Footer>
        </Modal>
    );
}
