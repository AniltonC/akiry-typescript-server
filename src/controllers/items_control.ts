import { Request, Response } from 'express';
import { internalServerError } from '../database/utils';
import { itemModel } from '../models/item';

const listItems = async (req: Request, res: Response) => {
    itemModel.listItems()
    .then(items => {
        res.json(items)
    })
    .catch(err => internalServerError(res, err))
}

export const itemsController = {
    listItems
}