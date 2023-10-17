<script setup lang="ts">
import { ref } from 'vue';
import { usePostsStore, type Post, type PostId } from '@/stores/posts';
import { useDate } from '@/composables/date';

interface Props {
    post?: Post,
    togglePostEditing?: () => void,
};

const props = defineProps<Props>();

const { addNewPost, editPost } = usePostsStore();

const {
    converteDateToSave,
} = useDate();

const title = ref(props.post?.title || '');
const shortDescription = ref(props.post?.shortDescription || '');
const longDescription = ref(props.post?.longDescription || '');

const clearForm = () => {
    title.value = '';
    shortDescription.value = '';
    longDescription.value = '';
};

const createPostId = (date: Date): PostId => {
    return `post-${date.getTime()}`
};

const submit = () => {
    const date: Date = new Date();

    const id = props.post?.id ? props.post.id : createPostId(date);

    const post: Post = {
        id,
        title: title.value,
        shortDescription: shortDescription.value,
        longDescription: longDescription.value,
        date: converteDateToSave(date),
    };

    if (props.post) editPost(post);
    else addNewPost(post);

    clearForm();
    if (props.togglePostEditing) props.togglePostEditing();
};
</script>

<template>
<form @submit.prevent="submit">
    <input v-model="title" type="text" id="title">
    <textarea v-model="shortDescription" id="shortDescription"></textarea>
    <textarea v-model="longDescription" id="longDescription"></textarea>
    <button type="submit">Добавить</button>
</form>
</template>

<style scoped lang="scss">
</style>
