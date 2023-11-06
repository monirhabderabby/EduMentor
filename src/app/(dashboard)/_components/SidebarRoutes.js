"use client";
//Packages
import { BarChart, Compass, Layout, List } from "lucide-react";

// Components
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
];

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];

const SidebarRoutes = () => {
    // hooks
    const pathName = usePathname();

    //JS Variables
    const isTeacherRoutes = pathName?.includes("/teacher");

    const routes = isTeacherRoutes ? teacherRoutes : guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    Icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};

export default SidebarRoutes;
