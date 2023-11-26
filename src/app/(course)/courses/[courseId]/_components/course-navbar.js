import NavbarRoutes from "@/components/navbar-routes";
import CourseModileSidebar from "./course-mobile-sidebar";

const CourseNavbar = ({ course, progressCount }) => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseModileSidebar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes />
        </div>
    );
};

export default CourseNavbar;
