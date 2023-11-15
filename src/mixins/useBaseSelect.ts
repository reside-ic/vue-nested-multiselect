import { ref } from "vue";
import { FlatOption, Option } from "../types";
import { collapseOptions, expandOptions, getFlattenedOptions } from "../utils";

export default (options: Option[]) => {
    const flatOptions = ref<FlatOption[]>(getFlattenedOptions(options));

    const expand = (optionPath: string[]) => {
        expandOptions(flatOptions.value, optionPath);
    };

      const collapse = (optionPath: string[]) => {
        collapseOptions(flatOptions.value, optionPath);
    };

    return {
        flatOptions,
        expand,
        collapse
    }
}