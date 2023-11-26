import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

const CourseEnrollButton = ({ price, courseId }) => {
    return (
        <Button className="w-full md:w-auto" size="sm">
            Enroll for {formatPrice(price)}
        </Button>
    );
};

export default CourseEnrollButton;
