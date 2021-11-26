import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';

export const connectDb = (handler : NextApiHandler) => async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    console.log('MonoDb readyState', mongoose.connections[0].readyState)

    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    const {DB_CONNECTION_STRING} = process.env;
    if(!DB_CONNECTION_STRING){
        return res.status(500).json({ error: "ENV Database connection não informou" })
    }

    await mongoose.connect(DB_CONNECTION_STRING);
    mongoose.connection.on('connected', () => console.log('Conectado ao DB'))
    mongoose.connection.on('error', error => console.log('Ocorreu um erro ao connectar no DB' + error))

    return handler(req, res);
}