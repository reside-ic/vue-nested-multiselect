<template>
    <div :style="{ paddingLeft: `${indentation * 1.6 + 0.5}rem` }"
         @click="handleClick"
         class="vnm-dropdown-item-div">
        <template v-if="option.hasChildren">
            <div class="vnm-icon-div" @click.prevent.stop="handleIconClick">
                <vue-feather type="chevron-right"
                            v-show="!option.open"
                            class="vnm-icon"/>
                <vue-feather type="chevron-down"
                            v-show="option.open"
                            class="vnm-icon"/>
            </div>
        </template>

        <template v-if="checked !== undefined">
            <div class="vnm-check-div">
                <check-box :checked="checked"/>
            </div>
        </template>

        <div class="vnm-text-div">
            <span>{{ option.label }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType, defineComponent, computed } from 'vue';
    import VueFeather from "vue-feather";
    import { FlatOption, CheckStatus } from '../types';
    import CheckBox from './CheckBox.vue';

    export default defineComponent({
        emits: ["select-item", "expand", "collapse"],
        props: {
            option: {
                type: Object as PropType<FlatOption>,
                required: true
            },
            checked: {
                type: Number as PropType<CheckStatus>
            }
        },
        components: {
            VueFeather,
            CheckBox
        },
        setup(props, { emit }) {
            const handleClick = () => {
                emit("select-item", props.option.id);
            };

            const handleIconClick = () => {
                if (props.option.hasChildren && props.option.open) {
                    emit("collapse", props.option.path);
                } else {
                    emit("expand", props.option.path);
                }
            };

            const indentation = computed(() => props.option.path.length - 1);

            return {
                handleClick,
                handleIconClick,
                indentation
            }
        },
    });
</script>

<style scoped>
.vnm-icon-div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.4rem;
}

.vnm-icon {
    width: 1.2rem !important;
    height: 1.2rem !important;
    vertical-align: sub;
}

.vnm-icon-div:hover {
    color: red;
}

.vnm-check-div {
    padding-top: 0.4rem;
    padding-bottom: 0.5rem;
    padding-left: 0.2rem;
}

.vnm-text-div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    white-space: normal;
    overflow: auto;
    overflow-wrap: break-word;
    color: #2c384af2;
}

.vnm-dropdown-item-div {
    padding-right: 0.5rem;
    display: flex;
    width: 100%;
}
</style>
