import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { Users, Admins } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id_user INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username_user VARCHAR(255) UNIQUE NOT NULL,
            password_user TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        Users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password_user, 10);
            return sql`
                INSERT INTO users (username_user, password_user)
                VALUES (${user.username_user}, ${hashedPassword})
                ON CONFLICT (id_user) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

async function seedAdmins() {
    await sql`
        CREATE TABLE IF NOT EXISTS admins (
            id_admin INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username_admin VARCHAR(255) UNIQUE NOT NULL,
            password_admin TEXT NOT NULL
        );
    `;

    const insertedAdmins = await Promise.all(
        Admins.map(async (admin) => {
            const hashedPassword = await bcrypt.hash(admin.password_admin, 10);
            return sql`
                INSERT INTO admins (username_admin, password_admin)
                VALUES (${admin.username_admin}, ${hashedPassword})
                ON CONFLICT (id_admin) DO NOTHING;
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