import CourseProgress from "@/components/course-progress";
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
            <div className="py-8 flex flex-col justify-center items-center border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {purchase && (
                    <div className="mt-10 w-full px-8">
                        <CourseProgress
                            variant="success"
                            value={progressCount}
                        />
                    </div>
                )}
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
