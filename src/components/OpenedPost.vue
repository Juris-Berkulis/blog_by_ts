<script setup lang="ts">
import type { Post } from '@/stores/posts';
import { useDate } from '@/composables/date';

interface Props {
    openedPost: Post,
};

defineProps<Props>();

const { converteSavedDateToShow } = useDate();
</script>

<template>
<div class="post">
    <h1 class="postTitle">{{ openedPost.title }}</h1>
    <p class="postDate">{{ converteSavedDateToShow(openedPost.date) }}</p>
    <div class="postDescription small">{{ openedPost.shortDescription }}</div>
    <div class="postDescription long">{{ openedPost.longDescription }}</div>
</div>
</template>

<style scoped lang="scss">
</style>
