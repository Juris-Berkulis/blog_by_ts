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
<article class="article">
    <h1 class="article__title">{{ openedPost.title }}</h1>
    <p class="article__date">{{ converteSavedDateToShow(openedPost.date) }}</p>
    <div class="article__description article__description_short">{{ openedPost.shortDescription }}</div>
    <div class="article__description article__description_long">{{ openedPost.longDescription }}</div>
</article>
</template>

<style scoped lang="scss">
$mb: 10px;

.article {
    margin-bottom: $mb;
}

.article__title {
    margin-bottom: $mb;
    text-align: center;
}

.article__date {
    margin-bottom: $mb;
    text-align: center;
}

.article__description {
    width: 100%;

    &_short {
        margin-bottom: $mb;
    }
}
</style>
