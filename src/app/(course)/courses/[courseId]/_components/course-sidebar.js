import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import CourseSidebarItem from "./course-sidebar-item";

const CourseSidebar = async ({ course, progressCount }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const purchase = await db.purchase.findFirst({
        where: {
            userId,
            courseId: course.id,
        },
    });
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="h-[80px] flex flex-col justify-center items-center border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {/* check purchase and add progress */}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseSidebar;
