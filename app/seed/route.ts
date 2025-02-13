import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { someUsers } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS pengguna (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        someUsers.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO pengguna (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers(),
        ]);

        return Response.json({ message: 'Database seeded successfully'});
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}