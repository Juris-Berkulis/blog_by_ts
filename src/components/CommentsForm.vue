<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseFormFieldWrapper from '@/components/base/BaseFormFieldWrapper.vue';
import BaseFormField from '@/components/base/BaseFormField.vue';
import type { PostId } from '@/stores/posts';
import { type Comment, type CommentId, useCommentsStore } from '@/stores/comments';
import { useValidation, type FieldsObj, type ValidatedObj } from '@/composables/validation';

interface Props {
    postId: PostId,
};

const props = defineProps<Props>();

const {
    addCommentIntoPost,
} = useCommentsStore();

export type CommentField = 'authorName' | 'authorEmail' | 'commentText';

const {
    maxLengthForAuthorName,
    maxLengthForAuthorEmail,
    maxLengthForCommentText,
    regExpForFullName,
    textForRequiredFieldError,
    textForEmailError,
    isShowFormErrors,
    textForMaxLengthError,
    requiredField,
    regExpMatching,
    maxLength,
    fieldValueAndError,
    errorForForm,
    checkAllFields,
    watchFieldObj,
} = useValidation<CommentField>();

const commentFieldObj: Ref<FieldsObj<CommentField>> = ref({
    authorName: fieldValueAndError({ label: 'Заголовок', fieldType: 'input'}),
    authorEmail: fieldValueAndError({ label: 'Короткое описание', fieldType: 'textarea'}),
    commentText: fieldValueAndError({ label: 'Длинное описание', fieldType: 'textarea'}),
});

const commentValidatedObj: ValidatedObj<CommentField> = {
    authorName: [
        { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        { isValid: (fieldValue) => maxLength(fieldValue, maxLengthForAuthorName), errorText: textForMaxLengthError(maxLengthForAuthorName) },
    ],
    authorEmail: [
        { isValid: (fieldValue) => regExpMatching(fieldValue, regExpForFullName), errorText: textForEmailError },
        { isValid: (fieldValue) => maxLength(fieldValue, maxLengthForAuthorEmail), errorText: textForMaxLengthError(maxLengthForAuthorEmail) },
    ],
    commentText: [
        { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        { isValid: (fieldValue) => maxLength(fieldValue, maxLengthForCommentText), errorText: textForMaxLengthError(maxLengthForCommentText) },
    ],
};

const resetForm = (): void => {
    for (let field in commentFieldObj.value) {
        commentFieldObj.value[field as CommentField].fieldValue = '';
    }
};

const createCommentId = (date: Date): CommentId => {
    return `comment-${date.getTime()}`
};

const submit = (): void => {
    checkAllFields(commentFieldObj, commentValidatedObj);

    if (!errorForForm(commentFieldObj)) {
        const comment: Comment = {
            id: createCommentId(new Date()), 
            authorName: commentFieldObj.value.authorName.fieldValue, 
            authorEmail: commentFieldObj.value.authorEmail.fieldValue, 
            text: commentFieldObj.value.commentText.fieldValue,
        };

        addCommentIntoPost(props.postId, comment);
        isShowFormErrors.value = false;
        resetForm();
    }
};

watchFieldObj(commentFieldObj, commentValidatedObj);
</script>

<template>
<form @submit.prevent="submit" @input="isShowFormErrors = true">
    <BaseFormFieldWrapper v-for="fieldValue, field of commentFieldObj" :key="field" :error="fieldValue.fieldError">
        <BaseFormField
            v-model:inputedValue="fieldValue.fieldValue" 
            :class="{form__input_error: fieldValue.fieldError}"
            :label="fieldValue.label" 
            :fieldType="fieldValue.fieldType"
        />
    </BaseFormFieldWrapper>
    <button type="submit">Добавить</button>
</form>
</template>

<style scoped lang="scss">
</style>
