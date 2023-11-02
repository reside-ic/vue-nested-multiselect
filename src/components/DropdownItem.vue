<template>
    <div :style="{ paddingLeft: `${indentation * 1.6 + 0.5}rem` }"
         @click="handleClick"
         class="dropdown-item-div">
        <template v-if="hasChildren">
            <div class="icon-div" @click="handleIconClick">
                <vue-feather type="chevron-right"
                            v-show="!open"
                            class="icon"/>
                <vue-feather type="chevron-down"
                            v-show="open"
                            class="icon"/>
            </div>
        </template>
        <div class="text-div">
            <span>{{ label }}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType, defineComponent } from 'vue';
    import VueFeather from "vue-feather";

    export default defineComponent({
        emits: ["select-item"],
        props: {
            hasChildren: {
                type: Boolean,
                required: true
            },
            open: Boolean,
            expand: {
                type: Function as PropType<(payload: MouseEvent) => void>,
                default: () => null
            },
            collapse: {
                type: Function as PropType<(payload: MouseEvent) => void>,
                default: () => null
            },
            label: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            indentation: {
                type: Number,
                required: true
            }
        },
        components: {
            VueFeather
        },
        setup(props, { emit }) {
            const handleClick = () => {
                emit("select-item", props.id);
            };

            const handleIconClick = (event: MouseEvent) => {
                event.preventDefault();

                // to stop it from emitting select item when someone
                // click the expand icon
                event.stopPropagation();

                if (props.open) {
                    props.collapse(event);
                } else {
                    props.expand(event);
                }
            };

            return {
                handleClick,
                handleIconClick
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
    flex-grow: 1;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.dropdown-item-div {
    padding-right: 0.5rem;
    display: flex;
    width: 100%;
}
</style>
