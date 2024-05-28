export function formatMongoDBTimestamp(mongoTimestamp: string): string {
    const date = new Date(mongoTimestamp);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = date.toLocaleDateString('en-US', options);

    return formattedDate;
}