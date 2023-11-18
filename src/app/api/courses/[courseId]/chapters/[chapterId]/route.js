import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!userId || !ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values,
            },
        });

        // TODO: Handle video upload
        return NextResponse.json(chapter);
    } catch (error) {
        console.log("[COURSE_CHAPTER]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
