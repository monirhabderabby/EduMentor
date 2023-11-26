import CourseList from "@/components/course-list";
import SearchInput from "@/components/search-input";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import getcourses from "../../../../../actions/get-courses";
import Categories from "./_components/categories";

const SearchPage = async ({ searchParams }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const courses = await getcourses({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="p-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Categories items={categories} />
                <CourseList items={courses} />
            </div>
        </>
    );
};

export default SearchPage;
