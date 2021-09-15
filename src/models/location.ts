import { Request } from "express";
import knex from "../database/connection"

export type Location = {
    id: number,
    name: string,
    image: string,
    email: string,
    whatsapp: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string
}


const listLocations = async (req: Request) => {
    const query = req.query;

    const parsedItems: Number[] = query.items ? String(query.items)
        .split(',')
        .map(item => {
            return Number(item.trim());
        })
        : [];

    return await knex('locations')
        .join('location_items', 'locations.id', '=', 'location_items.location_id')
        .where((location) => {
            if (query.items) {
                location.whereIn('location_items.item_id', parsedItems)
            }
            if (query.city) {
                location.where('city', String(query.city))
            }
            if (query.uf) {
                location.where('uf', String(query.uf))
            }

        })
        .distinct()
        .select('locations.*')

}

const getLocation = async (id: number) => {
    const location = await knex('locations').where('id', id).first();

    if (!location)
        return location;

    const items = await knex('items')
        .join('location_items', 'items.id', '=', 'location_items.item_id')
        .where('location_items.location_id', id)
        .select('items.title');

    return {
        location,
        items
    };
}

const insertLocation = async (location: Location, items: Array<number>) => {
    const transaction = await knex.transaction();

    const location_id = (await transaction('locations').insert(location))[0];

    const location_items = items.map((item_id: number) => {
        return {
            item_id,
            location_id
        }
    })

    await transaction('location_items').insert(location_items);

    await transaction.commit();

    location.id = location_id;

    return location;
}

const updateLocation = async (id: number, updtLocation: Location, updtItems: Array<number>) => {
    const transaction = await knex.transaction();


    const location = await transaction('locations').where({ id: id }).first();
    if (!location)
        return location;


    const location_id = await transaction('locations').where({ id: id }).update(updtLocation);

    await transaction('location_items')
        .where('location_id', id)
        .del();

    const location_items = updtItems.map((item_id: number) => {
        return {
            item_id,
            location_id
        }
    })
    await transaction('location_items').insert(location_items);

    const items = await transaction('items')
        .join('location_items', 'items.id', '=', 'location_items.item_id')
        .where('location_items.location_id', id)
        .select('items.title');

    await transaction.commit();

    return {
        location,
        items
    };
}

const deleteLocation = async (id: number) => {
    const output =
        await knex('locations').where('id', id).del() &&
        await knex('location_items').where('location_id', id).del();

    return output;
}

export const locationModel = {
    listLocations,
    getLocation,
    insertLocation,
    updateLocation,
    deleteLocation
}