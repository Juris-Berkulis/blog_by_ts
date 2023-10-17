<script setup lang="ts">
import type { FieldType } from '@/composables/validation';

interface Props {
    inputedValue: string,
    label: string,
    fieldType: FieldType,
};

defineProps<Props>();

const emit = defineEmits(['update:inputedValue']);

const changeInputedValue = (event: Event): void => {
    emit('update:inputedValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
<textarea
    class="field field_textarea"
    v-if="fieldType === 'textarea'"
    :value="inputedValue"
    :placeholder="label"
    @input="changeInputedValue" 
></textarea>
<input 
    class="field field_input"
    v-else-if="fieldType === 'input'"
    :value="inputedValue"
    :placeholder="label"
    @input="changeInputedValue" 
    type="text"
>
</template>

<style scoped lang="scss">
.field {
    padding: 12px 16px;
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
}
</style>
