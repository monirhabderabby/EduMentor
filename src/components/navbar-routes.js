"use client";

// Packages
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//Components
import { Button } from "./ui/button";

const NavbarRoutes = () => {
    //hooks
    const pathname = usePathname();

    // JS Variables
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isCoursePage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
            )}
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default NavbarRoutes;
