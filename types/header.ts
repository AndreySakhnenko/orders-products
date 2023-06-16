
export interface Locales {
    name: string,
    lang: string,
}
export interface Header {
    locales: Locales[];
    activeLocale: string,
    currentMonth: string,
    currentDay: string | number,
    currentYear: string | number,
    currentTime: string | number,
    currentDayOfWeek: string,
}