import md5 from 'md5';
import type {NextApiRequest, NextApiResponse} from 'next';
import { connectDb } from '../../middlewares/connectDb';
import { UserModel } from '../../models/UserModel';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { UserRequest } from '../../types/UserRequest';

const userEndpoint = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    if(req.method === 'POST'){
        const body = req.body as UserRequest

        if(!body.name || body.name.length < 2){
            return res.status(400).json({ msg : 'Nome inválio'});
        }

        if(!body.email || body.email.length < 5){
            return res.status(400).json({ msg : 'Email inválido'});
        }

        if(!body.password || body.password.length < 4){
            return res.status(400).json({ msg : 'Senha inválida'});
        }

        const ExistingUserWithEmail = await UserModel.find({email : body.email});
        if(ExistingUserWithEmail && ExistingUserWithEmail.length){
            return res.status(400).json({ error : 'Já existe usuário com o email informado'});
        }

        const user = {
            name : body.name,
            email : body.email,
            password : md5(body.password)
        }

        await UserModel.create(user)

        return res.status(200).json({ msg : 'Usuario Criado'});
    }

    return res.status(405).json({ error : 'Metodo infomado não é valido'});
}

export default connectDb(userEndpoint)