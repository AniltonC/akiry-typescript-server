import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('items');
}

