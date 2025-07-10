import { Learning } from "./learning";

export interface LearningResponse {
    data: Array<Learning>;
    first: 1,
    prev: number |  null,
    next: number,
    last: number,
    pages: number,
    items: number
}