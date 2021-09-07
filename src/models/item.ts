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
        if(item.image != null){
            serialized.image = `http://localhost:${PORT}/uploads/${item.image}`
        }
        return serialized;
    })
    return serializedItems;
}

export const itemModel = {
    listItems
}