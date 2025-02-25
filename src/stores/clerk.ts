import { defineStore } from 'pinia';
import { Clerk } from '@clerk/clerk-js';

// 替换为你的 Clerk 发布密钥
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerk = new Clerk(publishableKey);

export const useClerkStore = defineStore('clerk', {
    state: () => ({
        user: clerk.user,
        isLoaded: false,
    }),
    actions: {
        async load() {
            await clerk.load();
            this.isLoaded = true;
            this.user = clerk.user;
        },
        openSignIn() {
            clerk.openSignIn();
        },
        signOut() {
            clerk.signOut();
        },
    },
});
