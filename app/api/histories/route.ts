import { NextResponse } from "next/server";
import { auth } from "@/app/auth/auth";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    const session = await auth();

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const histories = await sql`
        SELECT * FROM ( 
            SELECT DISTINCT ON (movie_id) * FROM histories 
            WHERE user_id = ${session.user.id} 
            ORDER BY movie_id, watched_at DESC 
        ) AS unique_histories 
        ORDER BY watched_at DESC 
        LIMIT 5
    `;

    return NextResponse.json(histories);
}