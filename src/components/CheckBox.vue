<template>
    <div class="vnm-checked-div" v-show="checked === CheckStatus.CHECKED">
        <c-button class="vnm-check-button" disabled>
            <vue-feather type="check" class="vnm-checked-icon" stroke-width="3"/>
        </c-button>
    </div>
    <div class="vnm-checked-div" v-show="checked === CheckStatus.PARTIAL">
        <c-button class="vnm-check-button" disabled>
            <vue-feather type="minus" class="vnm-checked-icon" stroke-width="3"/>
        </c-button>
    </div>
    <div class="vnm-unchecked-div" v-show="checked === CheckStatus.UNCHECKED">
        <c-button class="vnm-check-button" disabled></c-button>
    </div>
</template>

<script lang="ts">
    import { PropType, defineComponent } from 'vue';
    import { CheckStatus } from '../types';
    import { CButton } from "@coreui/vue";
    import VueFeather from "vue-feather";

    export default defineComponent({
        props: {
            checked: {
                type: Number as PropType<CheckStatus>
            }
        },
        components: {
            VueFeather,
            CButton
        },
        setup() {
            return {
                CheckStatus
            }
        }
    });
</script>

<style scoped>
.vnm-checked-div, .vnm-unchecked-div {
    margin-right: 0.6rem
}

.vnm-check-button {
    height: 1rem;
    width: 1rem;
    padding: 0;
}

.vnm-checked-icon {
    height: 0.75rem;
    width: 0.75rem;
    margin-top: 0.05rem;
    vertical-align: super;
    color: aliceblue;
}

.vnm-checked-div > .btn.disabled, .btn:disabled {
    background-color: red;
    border-color: red !important;
    opacity: 1;
}

.vnm-unchecked-div > .btn.disabled, .btn:disabled {
    background-color: transparent;
    border-color: rgba(44, 56, 74, 0.95) !important;
    opacity: 1;
}
</style>