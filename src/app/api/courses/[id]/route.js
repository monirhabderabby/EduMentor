import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    const courseId = request.params.id;
    try {
        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
        });

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
