import knex from "../database/connection"
import PORT from "../server";

export type Item = {
    id: number,
    title: string,
    image: string
}

const listItems = async () => {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
        const serialized = item as Item;
        if (item.image != null) {
            serialized.image = `http://localhost:${PORT}/uploads/${item.image}`
        }
        return serialized;
    })
    return serializedItems;
}

const getItem = async (id: number) => {
    const item = await knex('items').where('id', id).first();
    return item as Item;
}

const insertItem = async (item: Item) => {
    const newId = await knex('items').insert(item);
    item.id = newId[0];
    return item;
}

export const itemModel = {
    listItems,
    getItem,
    insertItem
}