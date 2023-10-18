import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useCommentsStore } from '@/stores/comments';
import { useLocalStorage } from '@/composables/localStorage';

export type PostId = `post-${string}`;

export type Post = {
    id: PostId,
    title: string,
    shortDescription: string,
    longDescription: string,
    date: string,
};

export const usePostsStore = defineStore('posts', () => {
    const { deleteAllCommentsFromPost } = useCommentsStore();

    const { setIntoLocalStorage, getFromLocalStorage } = useLocalStorage();

    const postsListKey: string = 'postsListKey';
    const postsList: Ref<Post[]> = ref(getFromLocalStorage<Post[]>(postsListKey) || []);

    setIntoLocalStorage(postsListKey, postsList.value);

    const getPostIndex = (postId: PostId): number => {
        return postsList.value.findIndex((post) => post.id === postId)
    };

    const getPostById = (postId: PostId): Post | undefined => {
        return postsList.value[getPostIndex(postId)]
    };

    const addNewPost = (newPost: Post): void => {
        postsList.value.push(newPost);
    };

    const deletePost = (deletedPost: Post): void => {
        const deletedPostIndex = getPostIndex(deletedPost.id);
        postsList.value.splice(deletedPostIndex, 1);
        deleteAllCommentsFromPost(deletedPost.id);
    };

    const editPost = (editedPost: Post): void => {
        const editedPostIndex = getPostIndex(editedPost.id);
        postsList.value.splice(editedPostIndex, 1, editedPost);
    };

    return {
        postsList,
        getPostById,
        addNewPost,
        deletePost,
        editPost,
    }
});
