<script lang="ts">
import { defineComponent } from 'vue';
import { authStore } from '@/stores/authStore';
import type { RegisterDto } from '@/interface/index';
import { useRouter } from 'vue-router';
export default defineComponent({
    data() {
        const useAuthStore = authStore()
        const router = useRouter()
        return {
            useAuthStore: useAuthStore,
            router: router,
            firstName: '' as string,
            email: '' as string,
            password: '' as string,
            confirmPassword: '' as string,
            errorPassword: '' as string,
            isError: false
        }
    },
    methods: {
        async register() {
            var data: RegisterDto = {
                firstName: this.firstName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            }

            if (data.password !== data.confirmPassword) {
                this.isError = true
                this.errorPassword = "Password incorrect"
            } else {
                var response = await this.useAuthStore.register(data)
                if (response) {
                    this.router.push({ name: 'login' })
                }
            }

        }
    }
})
</script>
<template>
    <div class="card p-4 w-50 shadow-lg" data-bs-spy="scroll">
        <h3>Register new account.</h3>
        <hr>
        <div class="mb-3">
            <label for="username" class="form-label">UserName</label>
            <input type="text" class="form-control" v-model="firstName" id="username" placeholder="username">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="name@example.com">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="password..">
        </div>
        <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm password</label>
            <input type="password" class="form-control" v-model="confirmPassword" id="confirmPassword"
                placeholder="retype password..">
            <div class="text-danger" v-if="isError">{{ errorPassword }}</div>
        </div>
        <div class="px-3 w-100 mb-3">
            <button type="button" class="btn btn-primary w-100" @click.prevent="register">Register</button>
        </div>
        <div>
            <p>If you already have account <router-link :to="{ name: 'login' }">Login here</router-link></p>
        </div>
    </div>
</template>