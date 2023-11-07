<template>
    <div :style="{ paddingLeft: `${indentation * 1.6 + 0.5}rem` }"
         @click="handleClick"
         class="dropdown-item-div">
        <template v-if="option.hasChildren">
            <div class="icon-div" @click="handleIconClick">
                <vue-feather type="chevron-right"
                            v-show="!option.open"
                            class="icon"/>
                <vue-feather type="chevron-down"
                            v-show="option.open"
                            class="icon"/>
            </div>
        </template>
        <div class="text-div">
            <span>{{ option.label }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType, defineComponent, computed } from 'vue';
    import VueFeather from "vue-feather";
    import { FlatOption } from './types';

    export default defineComponent({
        emits: ["select-item", "expand", "collapse"],
        props: {
            expand: {
                type: Function as PropType<(payload: MouseEvent) => void>,
                default: () => null
            },
            collapse: {
                type: Function as PropType<(payload: MouseEvent) => void>,
                default: () => null
            },
            option: {
                type: Object as PropType<FlatOption>,
                required: true
            }
        },
        components: {
            VueFeather
        },
        setup(props, { emit }) {
            const handleClick = () => {
                emit("select-item", props.option.id);
            };

            const handleIconClick = (event: MouseEvent) => {
                event.preventDefault();

                // to stop it from emitting select item when someone
                // click the expand icon
                event.stopPropagation();

                if (props.option.hasChildren && props.option.open) {
                    emit("collapse", props.option.path);
                } else {
                    emit("expand", props.option.path);
                }
            };

            const indentation = computed(() => props.option.path.split('/').length - 2);

            return {
                handleClick,
                handleIconClick,
                indentation
            }
        },
    });
</script>

<style scoped>
.icon-div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.4rem;
    align-items: center;
}

.icon {
    width: 1.2rem !important;
    height: 1.2rem !important;
    vertical-align: sub;
}

.icon-div:hover {
    color: red;
}

.text-div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    white-space: normal;
    overflow: auto;
    overflow-wrap: break-word;
}

.dropdown-item-div {
    padding-right: 0.5rem;
    display: flex;
    width: 100%;
}
</style>
