import db from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function getSingleCourse(id) {
    try {
        const { userId } = auth();
        const result = await db.course.findUnique({
            where: {
                id: id,
                userId,
            },
        });

        return result;
    } catch (error) {
        return null;
    }
}
