export const useDate = () => {
    const addZeroToBeginingOfNumber = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`
    };

    const converteDateToSave = (date: Date): string => {
        const utcYear: number = date.getUTCFullYear();
        const utcMonth: number = date.getUTCMonth() + 1;
        const utcDayNumber: number = date.getUTCDate();
    
        return `${utcYear}-${addZeroToBeginingOfNumber(utcMonth)}-${addZeroToBeginingOfNumber(utcDayNumber)}`
    };

    const converteSavedDateToShow = (oldDateFormat: string): string => {
        return oldDateFormat.split('-').reverse().join('.')
    };

    return {
        converteDateToSave,
        converteSavedDateToShow,
    }
};
