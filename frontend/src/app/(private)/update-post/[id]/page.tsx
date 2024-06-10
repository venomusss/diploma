"use client";
import { useEffect, useState } from "react";
import { getSinglePostById, responsePostData } from "@/requests/posts";
import { UpdatePostForm } from "@/components/UpdatePostForm";

export default function UpdatePostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<responsePostData | null>(null);

  const fetchPost = async () => {
    const response = await getSinglePostById(params.id);
    setPost(response.post);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  return post ? <UpdatePostForm post={post} /> : null;
}
