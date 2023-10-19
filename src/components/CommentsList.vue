<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import CommentsListItem from '@/components/CommentsListItem.vue';
import type { PostId } from '@/stores/posts';
import { type Comment, useCommentsStore } from '@/stores/comments';

interface Props {
    postId: PostId,
};

const props = defineProps<Props>();

const {
    getCommentsListForPost,
} = useCommentsStore();

const commentsList: ComputedRef<Comment[]> = computed(() => {
    return getCommentsListForPost(props.postId)
});
</script>

<template>
<div>
    <CommentsListItem 
        class="comments-list__item" 
        v-for="comment of commentsList" 
        :key="comment.id" 
        :postId="postId" 
        :comment="comment" 
    />
</div>
</template>

<style scoped lang="scss">
.comments-list__item {
    margin-bottom: 30px;
}
</style>
