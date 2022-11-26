

export type UserType = { 
    id: number,
    name: string,
    relations: {
        id: number,
        status: string
    }[],
}

export type RelationType =  {
    id: number,
    status: string
}