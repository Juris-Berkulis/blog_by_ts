import { onUnmounted, ref, type Ref } from "vue";

export const useDelay = () => {
    const timerId: Ref<ReturnType<typeof setTimeout> | undefined> = ref();

    const createDelay = (delayInSeconds: number) => {
        const promise: Promise<void> = new Promise((resolve) => {
            timerId.value = setTimeout(() => {
                resolve();
            }, delayInSeconds * 1000);
        });

        return promise
    };

    onUnmounted(() => {
        clearTimeout(timerId.value);
    });

    return {
        createDelay,
    }
};
