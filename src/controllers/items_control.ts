import { Request, Response } from 'express';
import { badRequest, internalServerError, notFound, validateNumber } from '../database/utils';
import { Item, itemModel } from '../models/item';

const listItems = async (req: Request, res: Response) => {
    return itemModel.listItems()
        .then(items => {
            res.json(items)
        })
        .catch(err => internalServerError(res, err))
}

const getItem = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id)) {
        return badRequest(res, 'Invalid ID.');
    }

    return itemModel.getItem(id)
        .then(item => {
            if (item) {
                return res.json(item);
            }
            return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const insertItem = async (req: Request, res: Response) => {
    {
        const item = req.body;
        if (!item)
            return badRequest(res, "Invalid item")

        if (!item.title)
            return badRequest(res, "Missing item tile")
    }

    const item = req.body as Item;
    return itemModel.insertItem(item)
        .then(item => {
            return res.json(item);
        })
        .catch(err => internalServerError(res, err));
}

export const itemsController = {
    listItems,
    getItem,
    insertItem
}