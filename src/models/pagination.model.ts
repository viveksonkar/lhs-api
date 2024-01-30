export interface Pagination<T>{
    data: T[],
    total: number
}

export interface PaginationOptions{
    page: number,
    take: number,
    status: string,
    filter: string,
    filterBy: string
}