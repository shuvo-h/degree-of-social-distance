

export type UserType = { 
    id: number,
    name: string,
    relations: {
        id: number,
        status: string
    }[],
}