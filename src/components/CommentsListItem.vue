<script setup lang="ts">
import type { PostId } from '@/stores/posts';
import { type Comment, useCommentsStore } from '@/stores/comments';

interface Props {
    postId: PostId,
    comment: Comment,
};

defineProps<Props>();

const {
    deleteCommentFromPost,
} = useCommentsStore();
</script>

<template>
<div class="comment">
    <div class="comment__additionaly">
        <div class="comment__info">
            <p class="comment__author">{{ comment.authorName }}</p>
            <p class="comment__email">{{ comment.authorEmail }}</p>
        </div>
        <button class="comment__delete" @click="() => deleteCommentFromPost(postId, comment.id)">Удалить</button>
    </div>
    <p class="comment__text">{{ comment.text }}</p>
</div>
</template>

<style scoped lang="scss">
</style>
