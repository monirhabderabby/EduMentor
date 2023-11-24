const { auth } = require("@clerk/nextjs");
const { createUploadthing } = require("uploadthing/next");

const f = createUploadthing();

const handleauth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("unauthorized");
    return {
        userId,
    };
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4mb", maxFileCount: 1 } })
        .middleware(() => handleauth())
        .onUploadComplete(() => {}),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleauth())
        .onUploadComplete(() => {}),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512gb" } })
        .middleware(() => handleauth())
        .onUploadComplete(() => {}),
};

module.exports = {
    ourFileRouter,
};
