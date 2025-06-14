import { defineStore } from "pinia";
import api from "@/api/api";
import type { LoginDto, RegisterDto } from "@/interface";

export const authStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: false,
        userName: '' as string,
        role: ''
    }),
    actions: {
        async login(data: LoginDto) {
            try {
                const response = await api.login(data)
                if (response.data.success) {
                    return true
                }
            } catch (err) {
                console.log("FAILD TO LOGIN :", err)
            }
        },
        async logout() {
            try {
                return await api.logout()
            } catch (err) {
                console.log("FAILD TO LOGOUT :", err)
            }
        },
        async register(data: RegisterDto) {
            try {
                const response = await api.register(data)
                if (response.data.success) {
                    return true
                }
            } catch (err) {
                console.log("FAILD TO LOGIN :", err)
            }
        },
    }
})