import { ImageEntity } from "./imageEntity";

export interface ImageDTO extends Omit<ImageEntity, '_v' | 'createdAt' | 'updatedAt' > { }
export type TimeGroupLabel =
  | 'Today'
  | 'Yesterday'
  | 'This Week'
  | 'Last Week'
  | 'Last Month'
  | `${string} ${number}`  // For Month-Year like "June 2025"
  | `${number}`;           // For year like "2024"
