"use client";

// packages
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

// components
import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

export const AttachmentForm = ({ initialData, courseId }) => {
    // state
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // hooks
    const router = useRouter();

    // functions
    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course Updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async (id) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Attachments deleted");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && (
                        <>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add a File
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachments yet
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-xs line-clamp-1 flex-1">
                                        {attachment.name}
                                    </p>
                                    {deletingId === attachment.id ? (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                                        </div>
                                    ) : (
                                        <button
                                            className="ml-auto hover:opacity-75 transition"
                                            onClick={() =>
                                                onDelete(attachment.id)
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                    <div className="text-sx text-muted-foreground mt-4">
                        Add anything your students might need to complete the
                        course
                    </div>
                </div>
            )}
        </div>
    );
};
