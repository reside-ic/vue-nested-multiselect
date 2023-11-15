import { ref, computed, onMounted, onUnmounted } from "vue";

export default () => {
    const screenHeight = window.innerHeight;
    const dropdownRef = ref<any | null>(null);
    const bottomYPosition = ref<number | null>(null);

    const direction = computed(() => {
        return bottomYPosition.value &&
               bottomYPosition.value + 50 + Math.min(300, screenHeight * 0.4) > screenHeight ?
               "dropup" : undefined;
    });

    const updateYPosition = () => {
        if (dropdownRef.value) {
            const boundingClientRect = dropdownRef.value.getBoundingClientRect();
            bottomYPosition.value = boundingClientRect.y + boundingClientRect.height;
        }
    };

    onMounted(() => {
        window.addEventListener("scroll", updateYPosition);
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", updateYPosition);
    });

    return {
        direction,
        dropdownRef,
        updateYPosition,
        bottomYPosition
    }
}