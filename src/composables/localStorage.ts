import { watchEffect } from "vue";

export const useLocalStorage = () => {
    const setIntoLocalStorage = (key: string, element: any): void => {
        watchEffect(() => {
            localStorage.setItem(key, JSON.stringify(element));
        });
    };

    const getFromLocalStorage = <T>(key: string): T | null => {
        const element: string | null = localStorage.getItem(key);

        return element ? (JSON.parse(element) as T) : null
    };

    return {
        setIntoLocalStorage,
        getFromLocalStorage,
    }
};
