import {
    isToday,
    isYesterday,
    isThisWeek,
    isThisMonth,
    format,
    isSameMonth,
    isThisYear,
    subMonths,
    isSameYear,
    parseISO,
} from 'date-fns';
import { ImageDTO } from '../../domain/entity/image/imageDTO';
export function groupImagesByDate(images: ImageDTO[]) {
    const grouped: Record<string, ImageDTO[]> = {};
    const now = new Date();
    for (const image of images) {
        const date = image.takenAt
            ? typeof image.takenAt === 'string' ? parseISO(image.takenAt) : new Date(image.takenAt)
            : typeof image.uploadDate === 'string' ? parseISO(image.uploadDate) : new Date(image.uploadDate);
        let label = '';

        if (isToday(date)) {
            label = 'Today';
        } else if (isYesterday(date)) {
            label = 'Yesterday';
        } else if (isThisWeek(date)) {
            label = 'This Week';
        } else if (isSameMonth(date, subMonths(now, 1))) {
            label = 'Last Month';
        } else if (isThisYear(date)) {
            label = format(date, 'MMMM');
        } else {
            label = format(date, 'yyyy'); 
        }

        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(image);
    }

    return grouped;
}
