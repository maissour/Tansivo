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
