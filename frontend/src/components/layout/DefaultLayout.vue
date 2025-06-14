<script lang="ts">
import { defineComponent } from 'vue'
import { authStore } from '@/stores/authStore';
import { mapStores } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    setup() {
        const useAuthStore = authStore()
        const router = useRouter()
        // const { t, locale, availableLocales } = useI18n({ useScope: 'global' })
        return {
            useAuthStore: useAuthStore,
            router: router,
            // t: t,
            // locale: locale,
            // currentLocale: availableLocales
        }
    },
    computed: {
        ...mapStores(authStore),
        userName() {
            return this.useAuthStore.userName
        }
    },
    methods: {
        async logout() {
            const response = await this.useAuthStore.logout()
            if (response?.data.success) {
                this.router.push({ name: 'login' })
            }
        },
        changeLanguage(lang: string) {
            this.$i18n.locale = lang
        },
    }
})
</script>
<template>
    <div class="container-fluide h-100">
        <div class="row h-100">
            <div class="col-2 bg-light right-shadow h-100">
                <div class="container mt-3">
                    <router-link class="d-flex align-items-center gap-2" :to="{ name: 'home' }">
                        <img src="@/assets/img/invlogo.png" alt="logo" width="60" height="50">
                        <span>{{ userName }}</span>
                    </router-link>
                    <hr>
                    <div class="mb-2">
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" v-for="(lang, idx) in $i18n.availableLocales" :key="idx"
                                :class="['btn', 'btn-sm', lang === $i18n.locale ? 'btn-info' : 'btn-dark']"
                                @click="changeLanguage(lang)">
                                {{ lang.toUpperCase() }}
                            </button>
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-light">
                            <router-link class="d-flex align-items-center gap-2" :to="{ name: 'invoice' }">
                                <span><i class="fa-solid fa-file-lines"></i></span>
                                <span>{{ $t('menu.invoice') }}</span>
                            </router-link>
                        </li>
                        <li class="list-group-item bg-light cursor-pointer">
                            <div class="d-flex align-items-center gap-2" @click="logout">
                                <span><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
                                <span>{{ $t('menu.logout') }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-10 h-100 overflow-y-scroll pb-4"><router-view></router-view></div>
        </div>
    </div>

</template>

<style scoped>
.right-shadow {
    box-shadow: 0 0 3px 0 black;
}
</style>
