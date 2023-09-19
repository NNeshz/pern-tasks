import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: 'localhost',
    database: 'taskdb',
    user: 'postgres',
    password: 'Neshz'
})

pool.on('connect', () => {
    console.log(">>> Base de Datos Conectada");
})