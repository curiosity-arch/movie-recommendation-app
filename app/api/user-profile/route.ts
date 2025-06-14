import { NextResponse } from "next/server";
import {Pool} from 'pg';
import { getToken } from "next-auth/jwt";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET(req: Request) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token?.username) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = token.username;
    const client = await pool.connect();
    const result = await client.query(
        'SELECT username, tahun_lahir FROM users WHERE username = $1',
        [username]
    );
    client.release();

    if (result.rows.length === 0) {
        return NextResponse.json({ error: "User not found"}, { status: 404 });
    }
    
    const tahunLahir = parseInt(result.rows[0].tahun_lahir);
    const umur = new Date().getFullYear() - tahunLahir;

    return NextResponse.json({
        username: result.rows[0].username,
        tahun_lahir: tahunLahir,
        umur: umur,
    });
}