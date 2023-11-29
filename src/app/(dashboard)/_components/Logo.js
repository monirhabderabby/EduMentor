// Components
import Image from "next/image";

const Logo = () => {
    return (
        <Image
            height={130}
            width={130}
            alt="logo"
            src="/edumentor-logo.svg"
            priority
        />
    );
};

export default Logo;
