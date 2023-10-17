<script setup lang="ts">
import { RouterLink } from 'vue-router';
import OpenedPost from '@/components/OpenedPost.vue';
import CommentsForm from '@/components/CommentsForm.vue';
import CommentsList from '@/components/CommentsList.vue';
import { usePostsStore, type Post, type PostId } from '@/stores/posts';

interface Props {
    postId: PostId,
};

const props = defineProps<Props>();

const {
    getPostById,
} = usePostsStore();

const openedPost: Post | undefined = getPostById(props.postId)
</script>

<template>
<article>

</article>
<div v-if="openedPost">
    <OpenedPost :openedPost="openedPost" />
    <RouterLink to="/">К списку постов</RouterLink>
    <CommentsForm :postId="postId" />
    <CommentsList :postId="postId" />
</div>
<div v-else class="postNotFound">
    <h1>404</h1>
    <p>Статья не найдена</p>
    <RouterLink to="/">Вернуться на главную</RouterLink>
</div>
</template>

<style scoped lang="scss">
</style>
