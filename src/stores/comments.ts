import { defineStore } from "pinia";
import type { PostId } from "./posts";
import { ref, type Ref } from "vue";

export type CommentId = `comment-${string}`;

export interface Comment  {
    id: CommentId,
    authorName: string,
    authorEmail: string,
    text: string,
};

type CommentsObj = {
    [key: PostId]: Comment[],
};

export const useCommentsStore = defineStore('comments', () => {
    const commentsObj: Ref<CommentsObj> = ref({});

    const getCommentsListForPost = (postId: PostId): Comment[] => {
        if (!commentsObj.value[postId as keyof CommentsObj]) {
            commentsObj.value[postId as keyof CommentsObj] = [];
        }
        
        return commentsObj.value[postId as keyof CommentsObj]
    };

    const getCommentsCountOfPost = (postId: PostId): number => {
        return getCommentsListForPost(postId).length
    };

    const addCommentIntoPost = (postId: PostId, newComment: Comment): void => {
        getCommentsListForPost(postId).unshift(newComment);
    };

    const deleteCommentFromPost = (postId: PostId, commentId: CommentId): void => {
        const commentsList: Comment[] = getCommentsListForPost(postId);
        const deletedCommentIndex: number =  commentsList.findIndex((comment) => {
            return comment.id === commentId
        });
        commentsList.splice(deletedCommentIndex, 1);
    };

    return {
        getCommentsListForPost,
        getCommentsCountOfPost,
        addCommentIntoPost,
        deleteCommentFromPost,
    }
});
