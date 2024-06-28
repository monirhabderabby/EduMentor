import getBase64 from "@/lib/getBase64";
import Image from "next/image";

const NextImage = async ({ alt, src, className }) => {
  const blurDataUrl = await getBase64(src);

  return (
    <Image
      fill
      className={className}
      alt={alt}
      src={src}
      placeholder="blur"
      blurDataURL={blurDataUrl}
    />
  );
};

export default NextImage;
