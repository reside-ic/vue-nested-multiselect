<template>
    <div ref="dropdownRef">
        <c-dropdown auto-close="outside"
                    class="vnm-dropdown"
                    :popper="false"
                    :direction="direction"
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
                                       :checked="checkedObject ? checkedObject[option.path.join('/')] : undefined"
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
import { PropType, defineComponent, onUpdated } from 'vue';
import { CheckStatus, Option } from '../types';
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from "@coreui/vue";
import useDynamicPopper from '../mixins/useDynamicPopper';
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
        },
        checkedObject: {
            type: Object as PropType<Record<string, CheckStatus>>
        }
    },
    setup(props) {
        const { flatOptions, expand, collapse } = useBaseSelect(props.options);
        const { dropdownRef, direction, updateYPosition } = useDynamicPopper();

        onUpdated(updateYPosition);

        return {
            flatOptions,
            expand,
            collapse,
            dropdownRef,
            direction,
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