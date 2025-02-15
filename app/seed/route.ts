import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { Users, Admins } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        Users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (username, password)
                VALUES (${user.username}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

async function seedAdmins() {
    await sql`
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `;

    const insertedAdmins = await Promise.all(
        Admins.map(async (admin) => {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            return sql`
                INSERT INTO admins (username, password)
                VALUES (${admin.username}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedAdmins;
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            // seedUsers(),
            // seedAdmins(),
        ]);

        return Response.json({ message: 'Database seeded successfully'});
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}