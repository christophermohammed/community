import { ModelMetadata } from './model';
import { Media } from './media';

export type EventData = {
    title: string;
    description: string;
    media?: Media[];
    location: string;
    date: Date;
    community: string;
};

export type Event = EventData & ModelMetadata;