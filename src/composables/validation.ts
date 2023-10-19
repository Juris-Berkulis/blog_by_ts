import { type Ref, watch, ref } from 'vue';
import type { PostField } from '@/components/PostsForm.vue';
import type { CommentField } from '@/components/CommentsForm.vue';

export type FieldType = 'input' | 'textarea';

type FieldAdditionallyInput = { label: string, fieldType: FieldType, defaultValue?: string,};

type FieldValueAndError = {
    fieldValue: string, 
    fieldError: string,
} & FieldAdditionallyInput;

type Field = PostField | CommentField;

export type FieldsObj<T extends Field> = {
    [key in T]: FieldValueAndError;
};

type FieldOptions = { isValid: (fieldValue: any) => boolean, errorText: string };

export type ValidatedObj<T extends Field> = {
    [key in T]: FieldOptions[];
};

export const useValidation = <T extends Field>() => {
    const maxLengthForTitle: number = 50;
    const maxLengthForShortDescription: number = 100;
    const maxLengthForLongDescription: number = 255;
    const maxLengthForAuthorName: number = 50;
    const maxLengthForAuthorEmail: number = 50;
    const maxLengthForCommentText: number = 255;
    const regExpForFullName = /^[a-z]{1,}@[a-z]{1,10}\.[a-z]{1,8}$/i;
    const textForRequiredFieldError = 'Поле не заполненно';
    const textForRegExpError = 'Неверный формат';
    const textForEmailError = `${textForRegExpError}: example@example.example`;
    const textForMaxLengthError = (minLength: number): string => `Максимальная длина ${minLength} символов`;

    const isShowFormErrors: Ref<boolean> = ref(true);

    const requiredField = (value: string | boolean): boolean => {
        return !!value
    };

    const regExpMatching = (value: string, regExp: RegExp): boolean => {
        return regExp.test(value)
    };
    
    const maxLength = (value: string, maxStrLength: number): boolean => {
        return value.length <= maxStrLength
    };

    const fieldValueAndError = (params: FieldAdditionallyInput): FieldValueAndError => {
        return { fieldValue: params.defaultValue || '', fieldError: '', ...params }
    };

    const errorForForm = (fieldObj: Ref<FieldsObj<T>>) => {
        for (let field in fieldObj.value) {
            if (fieldObj.value[field as T].fieldError) return true
        }
    
        return false
    };

    const checkField = (field: T, fieldObj: Ref<FieldsObj<T>>, validatedObj: ValidatedObj<T>) => {
        for (let i = 0; i < validatedObj[field].length; i++) {
            const fieldOptions: FieldOptions = validatedObj[field][i];
    
            if (!fieldOptions.isValid(fieldObj.value[field].fieldValue)) {
                fieldObj.value[field].fieldError = fieldOptions.errorText; return
            }
        }
    
        fieldObj.value[field].fieldError = '';
    };
    
    const checkAllFields = (fieldObj: Ref<FieldsObj<T>>, validatedObj: ValidatedObj<T>): void => {
        for (let field in validatedObj) {
            checkField(field as T, fieldObj, validatedObj);
        }
    };
    
    const watchFieldObj = (fieldObj: Ref<FieldsObj<T>>, validatedObj: ValidatedObj<T>) => {
        for (let field in fieldObj.value) {
            watch([() => fieldObj.value[field as T].fieldValue], () => {
                if (isShowFormErrors.value) {
                    checkField(field as T, fieldObj, validatedObj);
                }
            });
        }
    };

    return {
        maxLengthForTitle,
        maxLengthForShortDescription,
        maxLengthForLongDescription,
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
    }
};
