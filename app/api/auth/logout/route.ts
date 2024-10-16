import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function DELETE() {
    try {
        cookies().delete("refreshToken");
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
