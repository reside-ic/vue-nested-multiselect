<template>
    <div>
        <c-dropdown auto-close="outside"
                    class="vnm-dropdown"
                    :popper="false"
                    :visible="showDropdownMenu"
                    @hide="$emit('hide')">
            <c-dropdown-toggle @click="$emit('toggle-click')">
                <slot></slot>
            </c-dropdown-toggle>
            <c-dropdown-menu class="vnm-menu"
                             @click.prevent
                             @mousedown.prevent>
                <template v-for="option in flatOptions">
                    <c-dropdown-item v-show="option.show" class="vnm-item">
                        <dropdown-item :option="option"
                                       @expand="expand"
                                       @collapse="collapse"
                                       @select-item="$emit('select-item', $event)"></dropdown-item>
                    </c-dropdown-item>
                </template>
            </c-dropdown-menu>
        </c-dropdown>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { Option } from '../types';
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
import useBaseSelect from '../mixins/useBaseSelect';
import DropdownItem from './DropdownItem.vue';

export default defineComponent({
    emits: ["hide", "toggle-click", "select-item"],
    components: {
        CDropdown,
        CDropdownToggle,
        CDropdownMenu,
        CDropdownItem,
        DropdownItem
    },
    props: {
        options: {
            type: Array as PropType<Option[]>,
            default: () => []
        },
        showDropdownMenu: {
            type: Boolean
        }
    },
    setup(props) {
        const { flatOptions, expand, collapse } = useBaseSelect(props.options);

        return {
            flatOptions,
            expand,
            collapse
        }
    },
});
</script>

<style scoped>
.vnm-dropdown {
  width: 100%;
}

.vnm-menu {
  width: 100%;
  max-height: min(300px, 40vh);
  overflow-y: auto;
}

.vnm-menu::-webkit-scrollbar {
  width: 5px;
}

.vnm-menu::-webkit-scrollbar-track {
  background: white;
  border-radius: 5px;
}

.vnm-menu::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 5px;
}

.vnm-item {
  padding: 0;
  display: flex;
}

.item:hover {
  cursor: pointer;
}

.dropdown-toggle {
  max-width: 100%;
  display: flex;
  align-items: center;
}

.dropdown-toggle::after {
  margin-left: auto !important;
}

.btn {
  border: 1px solid #dddddd;
}

.btn:hover {
  border: 1px solid #c7c7c7;
}

.btn:focus, .btn.focus {
  box-shadow: none;
}
</style>