<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { PostId } from '@/stores/posts';
import { type Comment, type CommentId, useCommentsStore } from '@/stores/comments';

interface Props {
    postId: PostId,
};

const props = defineProps<Props>();

const {
    addCommentIntoPost,
} = useCommentsStore();

const authorName: Ref<string> = ref('');
const authorEmail: Ref<string> = ref('');
const commentText: Ref<string> = ref('');

const clearForm = () => {
    authorName.value = '';
    authorEmail.value = '';
    commentText.value = '';
};

const createCommentId = (date: Date): CommentId => {
    return `comment-${date.getTime()}`
};

const submit = (): void => {
    const comment: Comment = {
        id: createCommentId(new Date()), 
        authorName: authorName.value, 
        authorEmail: authorEmail.value, 
        text: commentText.value
    };

    addCommentIntoPost(props.postId, comment);
    clearForm();
};
</script>

<template>
<form @submit.prevent="submit">
    <input v-model="authorName" type="text" id="authorName">
    <input v-model="authorEmail" type="text" id="authorEmail">
    <textarea v-model="commentText" id="commentText"></textarea>
    <button type="submit">Добавить</button>
</form>
</template>

<style scoped lang="scss">
</style>
