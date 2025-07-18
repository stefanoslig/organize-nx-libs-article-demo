import { Learning } from "@abc/shared/model";

export interface LearningResponse {
    data: Array<Learning>;
    first: 1,
    prev: number |  null,
    next: number,
    last: number,
    pages: number,
    items: number
}