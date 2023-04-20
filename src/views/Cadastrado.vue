<template>
    <div class="cont">
        <div class="container is-max-desktop my-6">
            <div class="notification is-primary is-vcentered">
                <b-icon icon="envelope" size="is-large"/> Parabéns, sua conta foi criada, confira seu email para ativar sua conta.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        
    }
</script>

<style scoped>
.is-vcentered {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>