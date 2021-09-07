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


const listLocations = async () => {
}

const getLocation = async (id: number) => {
    const location = await knex('locations').where('id', id).first();
    return location as Location;
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

export const locationModel = {
    listLocations,
    getLocation,
    insertLocation
}