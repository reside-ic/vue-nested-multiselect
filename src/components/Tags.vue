<template>
    <span class="tag-div">
        <template v-for="tag in tags">
            <c-button @click="(event: MouseEvent) => handleTagClick(event, tag.id)"
                        class="tag">{{ tag.label }}</c-button>
        </template>
    </span>
</template>

<script lang="ts">
    import { PropType, defineComponent } from 'vue';
    import { Tag } from './types';
    import { CButton } from "@coreui/vue";

    export default defineComponent({
        emits: ["select-tag"],
        props: {
            tags: {
                type: Array as PropType<Tag[]>,
                required: true
            }
        },
        components: {
            CButton
        },
        setup(_, { emit }) {
            const handleTagClick = (event: MouseEvent, tagId: string) => {
                event.preventDefault();
                event.stopPropagation();
                emit("select-tag", tagId);
            };

            return {
                handleTagClick
            }
        }
    });
</script>

<style scoped>
.tag-div > .btn {
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.tag-div {
  display: flex;
  flex-wrap: wrap;
  overflow-wrap: break-word;
  white-space: normal;
  overflow: auto;
  column-gap: 0.25rem;
  row-gap: 0.25rem;
  padding-right: 10px;
}

.tag, .tag:hover, .tag:focus, .tag:active {
  font-size: 0.75rem;
  color: white !important;
  background-color: #e31837 !important;
  border-color: #e31837 !important;
  overflow: auto;
  overflow-wrap: break-word;
  text-align: left;
}
</style>