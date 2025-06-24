import { NextResponse } from "next/server";
import { auth } from "@/app/auth/auth";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user?.id || !session.user?.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movieId, movieTitle } = await req.json();

    try {
        await sql`
            INSERT INTO history (user_id, movie_id, movie_title) 
            VALUES (${session.user.id}, ${movieId}, ${movieTitle})
        `;
        return NextResponse.json({ message: "History saved"});
    } catch (error) {
        console.error("Insert history error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}