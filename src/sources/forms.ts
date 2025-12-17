import {
    AdvancedFilterTypes,
    InputField,
    InputFieldTypes,
    DamsIcons,
    Entitytyping
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
    assetTypeTypeField: {
        type: InputFieldTypes.DropdownSingleselectMetadata,
        options: [
            {icon: DamsIcons.NoIcon, label: "Affichebeeld", value: "Affichebeeld"},
            {icon: DamsIcons.NoIcon, label: "Scènebeelden", value: "Scènebeelden"},
            {icon: DamsIcons.NoIcon, label: "Muziekfragmenten", value: "Muziekfragmenten"},
            {icon: DamsIcons.NoIcon, label: "Trailer", value: "Trailer"},
            {icon: DamsIcons.NoIcon, label: "Pers", value: "Pers"},
            {icon: DamsIcons.NoIcon, label: "Omkadering", value: "Omkadering"},
            {icon: DamsIcons.NoIcon, label: "Social media", value: "Social media"},
        ],
    },
    productionStatusTypeField: {
        type: InputFieldTypes.DropdownSingleselectMetadata,
        options: [
            {icon: DamsIcons.NoIcon, label: "Concept", value: "Concept"},
            {icon: DamsIcons.NoIcon, label: "Gepubliceerd", value: "Gepubliceerd"},
            {icon: DamsIcons.NoIcon, label: "Gearchiveerd", value: "Gearchiveerd"},
        ],
    },
    internalResponsibleTypeField: {
        type: InputFieldTypes.DropdownSingleselectRelations,
        entityType: Entitytyping.User,
        relationType: "hasUser",
        advancedFilterInputForRetrievingOptions: [
            {
                type: AdvancedFilterTypes.Text,
                key: ["dams:1|metadata.email.value"],
                value: "*",
                match_exact: false,
            },
            {
                type: AdvancedFilterTypes.Selection,
                key: "type",
                value: [Entitytyping.User],
                match_exact: true,
            },
        ],
        relationFilter: {
            type: AdvancedFilterTypes.Selection,
            key: ["dams:1|identifiers"],
            value: "$relationValues.hasUser.key",
            match_exact: true,
            item_types: [Entitytyping.User],
        },
    },
};
