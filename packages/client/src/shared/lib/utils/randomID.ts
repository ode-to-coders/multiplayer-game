/**
 * генератор случайной строки (временно или нет вместо uuid)
 * Принимает 2 параметра:
 * @param {number} numOfChars - ! количество желаемых символов id-строки 
 * @param {string | null} customChars - ? свой набор символов
 */

export function randomID (numOfChars: number, customChars: string | null = null): string {
    const chars = customChars || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    let res = "";
    for (let i = 0; i < numOfChars; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
}
