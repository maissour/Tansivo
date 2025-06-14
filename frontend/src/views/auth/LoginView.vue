<script lang="ts">
import { defineComponent } from 'vue';
import { authStore } from '@/stores/authStore';
import type { LoginDto } from '@/interface/index';
import { useRouter } from 'vue-router';
export default defineComponent({
    data() {
        const useAuthStore = authStore()
        const router = useRouter()
        return {
            useAuthStore: useAuthStore,
            router: router,
            email: '',
            password: '',
            rememberMe: false
        }
    },
    methods: {
        async login() {
            var data: LoginDto = {
                email: this.email,
                password: this.password,
                rememberMe: this.rememberMe
            }
            var response = await this.useAuthStore.login(data)
            if (response) {
                this.router.push({ name: 'home' })
            }
        }
    }
})
</script>
<template>
    <div class="card p-4 w-50 shadow-lg">
        <h3>Login to your account.</h3>
        <hr>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="name@example.com">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="password..">
        </div>
        <div class="px-3 w-100 mb-3">
            <button type="button" class="btn btn-primary w-100" @click="login">Login</button>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="rememberMe" value="" id="rememberMe">
            <label class="form-check-label" for="rememberMe">
                Rmember me
            </label>
        </div>
        <div>
            <p>If you don't have account <router-link :to="{ name: 'register' }">Register here</router-link></p>
        </div>
    </div>
</template>