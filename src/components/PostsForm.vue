<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseFormFieldWrapper from '@/components/base/BaseFormFieldWrapper.vue';
import BaseFormField from '@/components/base/BaseFormField.vue';
import { usePostsStore, type Post, type PostId } from '@/stores/posts';
import { useDate } from '@/composables/date';
import { useValidation, type FieldsObj, type ValidatedObj } from '@/composables/validation';

interface Props {
    post?: Post,
    togglePostEditing?: () => void,
};

const props = defineProps<Props>();

const { addNewPost, editPost } = usePostsStore();

const {
    converteDateToSave,
} = useDate();

export type PostField = 'title' | 'shortDescription' | 'longDescription';

const {
    maxLengthForTitle,
    maxLengthForShortDescription,
    maxLengthForLongDescription,
    textForRequiredFieldError,
    isShowFormErrors,
    textForMaxLengthError,
    requiredField,
    maxLength,
    fieldValueAndError,
    errorForForm,
    checkAllFields,
    watchFieldObj,
} = useValidation<PostField>();

const postFieldObj: Ref<FieldsObj<PostField>> = ref({
    title: fieldValueAndError({ label: 'Заголовок', fieldType: 'input', defaultValue: props.post?.title || ''}),
    shortDescription: fieldValueAndError({ label: 'Короткое описание', fieldType: 'textarea', defaultValue: props.post?.shortDescription || ''}),
    longDescription: fieldValueAndError({ label: 'Длинное описание', fieldType: 'textarea', defaultValue: props.post?.longDescription || ''}),
});

const postValidatedObj: ValidatedObj<PostField> = {
    title: [
        { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        { isValid: (fieldValue) => maxLength(fieldValue, maxLengthForTitle), errorText: textForMaxLengthError(maxLengthForTitle) },
    ],
    shortDescription: [
        { isValid: (fieldValue) => requiredField(fieldValue), errorText: textForRequiredFieldError },
        { isValid: (fieldValue) => maxLength(fieldValue, maxLengthForShortDescription), errorText: textForMaxLengthError(maxLengthForShortDescription) },
    ],
    longDescription: [
        { isValid: (fieldValue) => maxLength(fieldValue, maxLengthForLongDescription), errorText: textForMaxLengthError(maxLengthForLongDescription) },
    ],
};

const resetForm = (): void => {
    for (let field in postFieldObj.value) {
        postFieldObj.value[field as PostField].fieldValue = '';
    }
};

const createPostId = (date: Date): PostId => {
    return `post-${date.getTime()}`
};

const submit = () => {
    checkAllFields(postFieldObj, postValidatedObj);

    if (!errorForForm(postFieldObj)) {
        const date: Date = new Date();

        const id = props.post?.id ? props.post.id : createPostId(date);

        const post: Post = {
            id,
            title: postFieldObj.value.title.fieldValue,
            shortDescription: postFieldObj.value.shortDescription.fieldValue,
            longDescription: postFieldObj.value.longDescription.fieldValue,
            date: converteDateToSave(date),
        };

        if (props.post) editPost(post);
        else addNewPost(post);

        resetForm();
        isShowFormErrors.value = false;
        if (props.togglePostEditing) props.togglePostEditing();
    }
};

watchFieldObj(postFieldObj, postValidatedObj);
</script>

<template>
<form @submit.prevent="submit" @input="isShowFormErrors = true">
    <BaseFormFieldWrapper v-for="fieldValue, field of postFieldObj" :key="field" :error="fieldValue.fieldError">
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
