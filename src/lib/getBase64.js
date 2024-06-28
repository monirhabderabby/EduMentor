import { getPlaiceholder } from "plaiceholder";

const getBase64 = async (src) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};

export default getBase64;
