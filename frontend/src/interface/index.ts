export interface LoginDto {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface RegisterDto {
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ProductContent {
    id: number,
    selectedProd: boolean,
    prodName: string,
    prodPrice: string,
    prodQte: string
}

export interface Fields {
    x: number,
    y: number,
    text: string,
    dataFieldAtt: string
}