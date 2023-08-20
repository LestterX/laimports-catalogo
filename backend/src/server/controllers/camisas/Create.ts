import {Request, Response} from 'express'
import { CamisasProvider } from '../../database/providers/camisas';
import { ICamisa } from '../../database/models';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<ICamisa, 'id'>{}

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    console.log(req.body.liga);

    let liga = String(req.body.liga).toLocaleLowerCase()
    req.body.liga = liga
    let custo = String(req.body.custo).toUpperCase()
    req.body.custo = custo
    const result = await CamisasProvider.create(req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        })
    }
    return res.status(StatusCodes.CREATED).json(result)
};