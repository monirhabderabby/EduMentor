// packages
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
            <p>Welcome to Edu Mentor</p>
        </div>
    );
}
