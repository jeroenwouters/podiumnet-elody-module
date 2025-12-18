import { gql } from "graphql-modules";

export const productionQueries = gql`
    fragment minimalProduction on Production {
        intialValues {
            typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
            title: keyValue(key: "title", source: metadata)
            status: keyValue(key: "status", source: metadata, formatter: "pill")
        }
        allowedViewModes {
            viewModes(input: [
                { viewMode: ViewModesList }
                { viewMode: ViewModesGrid }
            ]) {
                ...viewModes
            }
        }
        teaserMetadata {
            typePillLabel: metaData {
                label(input: "Type")
                key(input: "typePillLabel")
            }
            title: metaData {
                label(input: "metadata.labels.production")
                key(input: "title")
            }
            status: metaData {
                label(input: "metadata.labels.status")
                key(input: "status")
            }
        }
        ...minimalBaseEntity
    }

    fragment fullProduction on Production {
        intialValues {
            typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
            ...entityAuditIntialValues
            title: keyValue(key: "title", source: metadata)
            status: keyValue(key: "status", source: metadata, formatter: "pill")
            description: keyValue(key: "description", source: metadata)
            internalResponsible: keyValue(
                key: "hasUser"
                source: relations
                metadataKeyAsLabel: "email"
            )
        }
        relationValues
        entityView {
            column {
                size(size: seventy)
                elements {
                    completenessOverview: windowElement {
                        label(input: "element-labels.completeness-overview-element")
                        expandButtonOptions {
                            shown(input: true)
                        }
                        Affiches: panels {
                            label(input: "Affiches")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Affiches: entityListElement {
                                label(input: "Affiches")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeAfficheFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        Scenebeelden: panels {
                            label(input: "Scènebeelden")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Scenebeelden: entityListElement {
                                label(input: "Scènebeelden")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeSceneFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        Muziekfragmenten: panels {
                            label(input: "Muziekfragmenten")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Muziekfragmenten: entityListElement {
                                label(input: "Muziekfragmenten")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeMusicFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        Trailer: panels {
                            label(input: "Trailer")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Trailer: entityListElement {
                                label(input: "Trailer")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeTrailerFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        Rider: panels {
                            label(input: "Rider")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Rider: entityListElement {
                                label(input: "Rider")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeRiderFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        Pers: panels {
                            label(input: "Pers")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Pers: entityListElement {
                                label(input: "Pers")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypePersFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        Omkadering: panels {
                            label(input: "Omkadering")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            Omkadering: entityListElement {
                                label(input: "Omkadering")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeOmkaderingFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                        SocialMedia: panels {
                            label(input: "Social media posts")
                            panelType(input: metadata)
                            isCollapsed(input: true)
                            isEditable(input: true)
                            canBeMultipleColumns(input: true)
                            SocialMedia: entityListElement {
                                label(input: "Social media posts")
                                isCollapsed(input: false)
                                entityTypes(input: [asset])
                                relationType: label(input: "hasAsset")
                                searchInputType(input: "AdvancedInputType")
                                customQuery(input: "GetAssetsInCompletenessOverview")
                                customQueryFilters(input: "GetAssetsWithTypeSocialMediaFilters")
                                customBulkOperations(input: "GetBulkOperationsForCompletenessAssetInProduction")
                            }
                        }
                    }
                    Assets: entityListElement {
                        label(input: "element-labels.all-assets-element")
                        isCollapsed(input: false)
                        entityTypes(input: [asset])
                        relationType: label(input: "hasAsset")
                        searchInputType(input: "AdvancedInputType")
                        customQuery(input: "GetAssets")
                        customQueryFilters(input: "GetAssetsInProductionFilters")
                        customBulkOperations(input: "GetBulkOperationsForAssetInProduction")
                    }
                }
            }
            column2: column {
                size(size: thirty)
                elements {
                    windowElement {
                        label(input: "window-element-labels.info-window")
                        expandButtonOptions {
                            shown(input: true)
                        }
                        info: panels {
                            label(input: "panel-labels.production-info")
                            panelType(input: metadata)
                            isCollapsed(input: false)
                            isEditable(input: true)
                            title: metaData {
                                label(input: "metadata.labels.title")
                                key(input: "title")
                                inputField(type: baseTextField) {
                                    ...inputfield
                                    validation(input: { value: required }) {
                                        ...validation
                                    }
                                }
                            }
                            description: metaData {
                                label(input: "metadata.labels.description")
                                key(input: "description")
                                inputField(type: baseTextareaField) {
                                    ...inputfield
                                }
                            }
                            status: metaData {
                                label(input: "metadata.labels.status")
                                key(input: "status")
                                inputField(type: productionStatusTypeField) {
                                    ...inputfield
                                }
                            }
                            internalResponsible: metaData {
                                label(input: "Interne verantwoordelijke")
                                key(input: "internalResponsible")
                                inputField(type: internalResponsibleTypeField) {
                                    ...inputfield
                                }
                            }
                        }
                    }
                    audit: windowElement {
                        label(input: "panel-labels.audit-panel")
                        audit: panels {
                            label(input: "panel-labels.audit-panel")
                            panelType(input: metadata)
                            isCollapsed(input: false)
                            isEditable(input: false)
                            canBeMultipleColumns(input: true)
                            ...entityAuditMetadata
                        }
                    }
                }
            }
        }
    }

    fragment productionSortOptions on Production {
        sortOptions {
            options(
                input: [
                    { icon: NoIcon, label: "metadata.labels.title", value: "title" }
                ]
            ) {
                icon
                label
                value
            }
        }
    }

    query GetProductionCreateForm {
        GetDynamicForm {
            label(input: "navigation.create-production")
            Production: formTab {
                formFields {
                    title: metaData {
                        label(input: "metadata.labels.title")
                        key(input: "title")
                        inputField(type: baseTextField) {
                            ...inputfield
                            validation(input: { value: required }) {
                                ...validation
                            }
                        }
                    }
                    status: metaData {
                        label(input: "metadata.labels.status")
                        key(input: "status")
                        inputField(type: productionStatusTypeField) {
                            ...inputfield
                        }
                    }
                    createAction: action {
                        label(input: "actions.labels.create")
                        icon(input: Create)
                        actionType(input: submit)
                        actionQuery(input: "CreateEntity")
                        creationType(input: production)
                    }
                }
            }
        }
    }

    fragment filtersForProduction on Production {
        advancedFilters {
            title: advancedFilter(
                type: text
                key: ["dams:1|metadata.title.value"]
                label: "metadata.labels.title"
                isDisplayedByDefault: true
            ) {
                type
                key
                label
                isDisplayedByDefault
            }
            status: advancedFilter(
                type: selection
                key: ["dams:1|metadata.status.value"]
                label: "metadata.labels.status"
                useNewWayToFetchOptions: true
                filterOptionsMapping: {
                    label: "intialValues.status"
                    value: "intialValues.status"
                }
                isDisplayedByDefault: true
                advancedFilterInputForRetrievingOptions: [
                    {
                        type: text
                        key: ["dams:1|metadata.status.value"]
                        distinct_by: "metadata.status.value"
                        value: "*"
                    }
                    { type: type, value: "production" }
                ]
            ) {
                type
                key
                label
                isDisplayedByDefault
                advancedFilterInputForRetrievingOptions {
                    type
                    key
                    value
                    distinct_by
                    match_exact
                }
                filterOptionsMapping {
                    label
                    value
                }
                useNewWayToFetchOptions
                tooltip(value: true)
            }
            ...entityAuditFilters
            type: advancedFilter(type: type) {
                type
                defaultValue(value: "production")
                hidden(value: true)
            }
        }
    }
    
    fragment productionBulkOperations on Production {
        bulkOperationOptions {
            options(
                input: [
                    {
                        icon: Create
                        label: "bulk-operations.create-production"
                        value: "createEntity"
                        primary: true
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: noneSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                        }
                        bulkOperationModal: {
                            typeModal: DynamicForm
                            formQuery: "GetProductionCreateForm"
                            askForCloseConfirmation: true
                            neededPermission: cancreate
                        }
                    }
                    {
                        label: "bulk-operations.delete-selected"
                        value: "deleteEntities"
                        primary: false
                        bulkOperationModal: {
                            typeModal: BulkOperationsDeleteEntities
                            askForCloseConfirmation: false
                        }
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: someSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-someselected"
                        }
                    }
                ]
            ) {
                icon
                label
                value
                primary
                can
                actionContext {
                    ...actionContext
                }
                bulkOperationModal {
                    ...bulkOperationModal
                }
            }
        }
    }

    query GetPreviewInProduction {
        PreviewElement {
            column {
                size(size: hundred)
                elements {
                    entityListElement {
                        label(input: "element-labels.assets-element")
                        isCollapsed(input: false)
                        entityTypes(input: [asset])
                        baseLibraryMode(input: previewBaseLibrary)
                        relationType: label(input: "hasAsset")
                        searchInputType(input: "AdvancedInputType")
                        customQuery(input: "GetAssets")
                        customQueryFilters(input: "GetAssetsInProductionFilters")
                        customBulkOperations(
                            input: "GetBulkOperationsForAssetInProduction"
                        )
                    }
                }
            }
        }
    }

    fragment previewForProduction on Production {
        previewComponent {
            type(input: ColumnList)
            listItemsCoverage(input: OneListItem)
            previewQuery(input: "GetPreviewInProduction")
        }
    }
    
    query GetAssetsInProductionFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(type: type) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                }
            }
        }
    }

    query GetBulkOperationsForAssetInProduction {
        CustomBulkOperations {
            bulkOperationOptions {
                options(
                    input: [
                        {   
                            icon: PlusCircle
                            label: "bulk-operations.create-asset"
                            value: "createEntity"
                            primary: true
                            actionContext: {
                                activeViewMode: readMode
                                entitiesSelectionType: noneSelected
                                labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                            }
                            bulkOperationModal: {
                                typeModal: DynamicForm
                                formQuery: "GetAssetCreateFormInDetail"
                                formRelationType: "isAssetFor"
                                askForCloseConfirmation: true
                                neededPermission: cancreate
                            }
                        }
                        {
                            icon: PlusCircle
                            label: "bulk-operations.add-existing-relation"
                            value: "addRelation"
                            actionContext: {
                                activeViewMode: readMode
                                entitiesSelectionType: noneSelected
                                labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                            }
                            bulkOperationModal: {
                                typeModal: DynamicForm
                                formQuery: "GetImportExistingEntityQuery"
                                askForCloseConfirmation: true
                                neededPermission: canupdate
                            }
                        }
                    ]
                ) {
                    icon
                    label
                    value
                    primary
                    can
                    actionContext {
                        ...actionContext
                    }
                    bulkOperationModal {
                        ...bulkOperationModal
                    }
                }
            }
        }
    }
    
    query GetBulkOperationsForCompletenessAssetInProduction {
        CustomBulkOperations {
            bulkOperationOptions {
                options(
                    input: [
                        {   
                            icon: PlusCircle
                            label: "bulk-operations.create-asset"
                            value: "createEntity"
                            primary: true
                            actionContext: {
                                activeViewMode: readMode
                                entitiesSelectionType: noneSelected
                                labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                            }
                            bulkOperationModal: {
                                typeModal: DynamicForm
                                formQuery: "GetAssetCreateFormInDetail"
                                formRelationType: "isAssetFor"
                                askForCloseConfirmation: true
                                neededPermission: cancreate
                            }
                        }
                    ]
                ) {
                    icon
                    label
                    value
                    primary
                    can
                    actionContext {
                        ...actionContext
                    }
                    bulkOperationModal {
                        ...bulkOperationModal
                    }
                }
            }
        }
    }

    query GetAssetCreateFormInDetail {
        GetDynamicForm {
            label(input: "Maak Asset aan")
            asset: formTab {
                formFields {
                    title: metaData {
                        label(input: "Titel")
                        key(input: "title")
                        inputField(type: baseTextField) {
                            ...inputfield
                            validation(input: { value: required }) {
                                ...validation
                            }
                        }
                    }
                    status: metaData {
                        label(input: "Asset status")
                        key(input: "status")
                        inputField(type: assetStatusTypeField) {
                            ...inputfield
                        }
                    }
                    assetType: metaData {
                        label(input: "Asset type")
                        key(input: "assetType")
                        inputField(type: assetTypeTypeField) {
                            ...inputfield
                        }
                    }
                    availableForVenues: metaData {
                        label(input: "Beschikbaar voor podiumhuizen")
                        key(input: "availableForVenues")
                        inputField(type: baseCheckbox) {
                            ...inputfield
                        }
                    }
                    createAction: action {
                        label(input: "actions.labels.create")
                        icon(input: Create)
                        actionType(input: submit)
                        actionQuery(input: "CreateEntity")
                        creationType(input: asset)
                        showsFormErrors(input: true)
                    }
                }
            }
        }
    }
    
    query GetAssetsInCompletenessOverview(
        $type: Entitytyping!
        $limit: Int
        $skip: Int
        $searchValue: SearchFilter!
        $advancedSearchValue: [FilterInput]
        $advancedFilterInputs: [AdvancedFilterInput!]!
        $searchInputType: SearchInputType
        $userUuid: String!
    ) {
        Entities(
            type: $type
            limit: $limit
            skip: $skip
            searchValue: $searchValue
            advancedSearchValue: $advancedSearchValue
            advancedFilterInputs: $advancedFilterInputs
            searchInputType: $searchInputType
        ) {
            count
            limit
            results {
                id
                uuid
                type
                ... on Asset {
                    intialValues {
                        typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
                        title: keyValue(key: "title", source: metadata)
                        status: keyValue(key: "status", source: metadata, formatter: "pill")
                        todo: keyValue(
                            key: "todo"
                            source: relationMetadata
                            uuid: $userUuid
                            relationKey: "hasAsset"
                        )
                    }
                    teaserMetadata {
                        typePillLabel: metaData {
                            label(input: "Type")
                            key(input: "typePillLabel")
                        }
                        thumbnail: thumbnail {
                            filename(fromMediafile: true)
                        }
                        title: metaData {
                            label(input: "metadata.labels.title")
                            key(input: "title")
                        }
                        status: metaData {
                            label(input: "Asset status")
                            key(input: "status")
                        }
                        todo: relationMetaData {
                            label(input: "metadata.labels.todo")
                            key(input: "todo")
                            inputField(type: baseTextField) {
                                ...inputfield
                            }
                            __typename
                        }
                        contextMenuActions {
                            doLinkAction {
                                label(input: "contextMenu.contextMenuLinkAction.followLink")
                                icon(input: "AngleRight")
                                __typename
                            }
                        }
                    }
                    __typename
                }
            }
        }
    }

    query GetAssetsWithTypeAfficheFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Affichebeeld")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }

    query GetAssetsWithTypeSceneFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Scènebeelden")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
    
    query GetAssetsWithTypeMusicFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Muziekfragmenten")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
    
    query GetAssetsWithTypeTrailerFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Trailer")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
    
    query GetAssetsWithTypeRiderFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Rider")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
    
    query GetAssetsWithTypePersFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Pers")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
    
    query GetAssetsWithTypeOmkaderingFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Omkadering")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
    
    query GetAssetsWithTypeSocialMediaFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(
                    type: type
                    operator: and
                ) {
                    type
                    defaultValue(value: "asset")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                    operator: and
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasAsset.key")
                    hidden(value: true)
                    operator
                }
                assetType: advancedFilter(
                    type: text
                    key: ["elody:1|metadata.assetType.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "Social media")
                    operator
                }
                unfinishedStatus: advancedFilter(
                    type: selection
                    key: ["elody:1|metadata.status.value"]
                    operator: and
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: ["Concept", "Verwacht"])
                    operator
                }
            }
        }
    }
`;
