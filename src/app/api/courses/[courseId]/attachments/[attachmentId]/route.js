import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// controller for delete specefic attachment from the course
export async function DELETE(req, { params }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse.json("Unauthorized", { status: 401 });
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            },
        });

        return NextResponse.json(attachment, { status: 200 });
    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse.json("Intenal Error", { status: 500 });
    }
}
