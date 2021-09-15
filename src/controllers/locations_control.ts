import { Request, Response } from "express"
import knex from "../database/connection";
import { Location, locationModel } from "../models/location";
import { badRequest, internalServerError, notFound, ok, validateNumber } from "./utils";

const listLocations = async (req: Request, res: Response) => {
    return locationModel.listLocations(req)
        .then(locations => {
            if (locations)
                return res.json(locations);
            return notFound(res);
        })
        .catch(err => internalServerError(res, err))
}

const getLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id)) {
        return badRequest(res, 'Invalid ID');
    }

    return locationModel.getLocation(id)
        .then(location_items => {
            if (location_items) {
                return res.json(location_items);
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

const updateLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id)) {
        return badRequest(res, 'Invalid ID');
    }

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

    return locationModel.updateLocation(id, location, items)
        .then(location => {
            return res.json(location);
        })
        .catch(err => internalServerError(res, err));

    /*     return locationModel.updateLocation(parseInt(req.params.id))
            .then(location_items => {
                if (location_items) {
                    return res.json(location_items);
                }
                return notFound(res);
            })
            .catch(err => internalServerError(res, err)); */
}

const deleteLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!validateNumber(id)) {
        return badRequest(res, 'Invalid ID');
    }

    return locationModel.deleteLocation(id)
        .then(output => {
            console.log(output);
            if (output) {
                return ok(res);
            }
            return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}
export const locationsController = {
    listLocations,
    getLocation,
    insertLocation,
    updateLocation,
    deleteLocation
}