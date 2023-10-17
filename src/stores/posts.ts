import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export type PostId = `post-${string}`;

export type Post = {
    id: PostId,
    title: string,
    shortDescription: string,
    longDescription: string,
    date: string,
}

export const usePostsStore = defineStore('posts', () => {
    const postsList: Ref<Post[]> = ref([]);

    const addNewPost = (newPost: Post): void => {
        postsList.value.push(newPost);
    };

    const deletePost = (deletedPost: Post): void => {
        const deletedPostIndex = postsList.value.findIndex((post) => post.id === deletedPost.id);
        postsList.value.splice(deletedPostIndex, 1);
    };

    const editPost = (editedPost: Post): void => {
        console.log(postsList.value)
        console.log(editedPost)
        const editedPostIndex = postsList.value.findIndex((post) => post.id === editedPost.id);
        postsList.value.splice(editedPostIndex, 1, editedPost);
        console.log(postsList.value)
    };

    return {
        postsList,
        addNewPost,
        deletePost,
        editPost,
    }
});
