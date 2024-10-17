import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function DELETE() {
    try {
        cookies().delete("refreshToken");
        cookies().delete("accessToken"); // temp may be
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
