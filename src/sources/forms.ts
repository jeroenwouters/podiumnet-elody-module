import {
    AdvancedFilterTypes,
    InputField,
    InputFieldTypes,
    DamsIcons,
} from "../../generated-types/type-defs";

export const podiumnetFields: { [key: string]: InputField } = {
    assetStatusTypeField: {
        type: InputFieldTypes.DropdownSingleselectMetadata,
        options: [
            {icon: DamsIcons.NoIcon, label: "Concept", value: "Concept"},
            {icon: DamsIcons.NoIcon, label: "Verwacht", value: "Verwacht"},
            {icon: DamsIcons.NoIcon, label: "Finaal", value: "Finaal"},
        ],
    },
};
