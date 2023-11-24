import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID,
    process.env.MUX_TOKEN_SECRET
);

export async function PATCH(req, { params }) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(request, response) {
    const courseId = request.params.courseId;
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

export async function DELETE(req, { params }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });

        // console.log(course.chapters);

        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await Video.Assets.del(chapter.muxData.assetId);
            }
        }

        // Now, delete MuxData records associated with the chapters
        await db.muxData.deleteMany({
            where: {
                chapterId: {
                    in: course.chapters.map((chapter) => chapter.id),
                },
            },
        });

        // Delete chapters associated with the course
        await db.chapter.deleteMany({
            where: {
                courseId: params.courseId,
            },
        });

        console.log("courseid", params.courseId);

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            },
        });

        return NextResponse.json(deletedCourse);
    } catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
