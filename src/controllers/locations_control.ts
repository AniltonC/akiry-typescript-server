import { Request, Response } from "express"
import knex from "../database/connection";
import { badRequest, internalServerError, notFound, validateNumber } from "../database/utils";
import { Location, locationModel } from "../models/location";

const listLocations = async (req: Request, res: Response) => {
    return locationModel.listLocations()
        .then(locations => {
            res.json(locations);
        })
        .catch(err => internalServerError(res, err))
}

const getLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id)) {
        return badRequest(res, 'Invalid ID');
    }

    return locationModel.getLocation(id)
        .then(location => {
            if (location) {
                return res.json(location);
            }
            return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const insertLocation = async (req: Request, res: Response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = req.body;

    const location = {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    } as Location;

    if (items?.length) {
        let itemNotFound: number | undefined = undefined;

        const items_ids: Array<number> = (await knex('items').select('id'))
            .map(item => { return item.id });

        items.forEach((item: number) => {
            if (!items_ids.includes(item)) {
                itemNotFound = item;
            }
        })

        if (itemNotFound)
            return badRequest(res, `Item ${itemNotFound} not found`);
    }

    return locationModel.insertLocation(location, items)
        .then(location => {
            return res.json(location);
        })
        .catch(err => internalServerError(res, err));
}

export const locationsController = {
    listLocations,
    getLocation,
    insertLocation
}