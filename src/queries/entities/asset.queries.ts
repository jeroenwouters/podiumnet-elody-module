import { gql } from "@apollo/client";
import {podiumnetFields} from "../../sources/forms";

export const assetQueries = gql`
    fragment minimalAsset on Asset {
        ...minimalBaseEntity
        intialValues {
            title: keyValue(key: "title", source: metadata)
            status: keyValue(key: "status", source: metadata, formatter: "pill")
            dateAvailable: keyValue(key: "dateAvailable", source: metadata)
        }
        teaserMetadata {
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
            dateAvailable: metaData {
                label(input: "Datum beschikbaar")
                key(input: "dateAvailable")
            }
        }
    }

    fragment fullAsset on Asset {
        intialValues {
            typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
            title: keyValue(key: "title", source: metadata)
            description: keyValue(key: "description", source: metadata)
            status: keyValue(key: "status", source: metadata, formatter: "pill")
            assetType: keyValue(key: "assetType", source: metadata)
            dateAvailable: keyValue(key: "dateAvailable", source: metadata)
            links: keyValue(key: "links", source: metadata)
            ...entityAuditIntialValues
        }
        relationValues
        entityView {
            column {
                size(size: seventy)
                elements {
                    Mediafiles: entityListElement {
                        label(input: "Mediafiles")
                        isCollapsed(input: false)
                        type(input: media)
                        entityTypes(input: [mediafile])
                        relationType: label(input: "hasMediafile")
                        enableNavigation(input: true)
                        customQuery(input: "GetMediafilesInAsset")
                        customQueryFilters(input: "GetMediafilesInAssetFilters")
                        searchInputType(input: "AdvancedInputMediaFilesType")
                        customBulkOperations(
                            input: "GetBulkOperationsForMediafilesInDetail"
                        )
                    }
                    Podiumhuizen: entityListElement {
                        label(input: "Gelinkte podiumhuizen")
                        isCollapsed(input: false)
                        entityTypes(input: [podiumhuis])
                        relationType: label(input: "hasPodiumhuis")
                        searchInputType(input: "AdvancedInputType")
                        customQuery(input: "GetPodiumhuis")
                        customQueryFilters(input: "GetPodiumhuisFilters")
                        customBulkOperations(input: "GetBulkOperationsForPodiumhuisInAsset")
                    }
                }
            }
            column2: column {
                size(size: thirty)
                elements {
                    windowElement {
                        label(input: "Metadata")
                        editMetadataButton(input: { hasButton: true }) {
                            ...editMetadataButton
                        }
                        metadata: panels {
                            label(input: "Beschrijving")
                            panelType(input: metadata)
                            isEditable(input: true)
                            isCollapsed(input: false)

                            title: metaData {
                                label(input: "Title")
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
                                label(input: "Asset status")
                                key(input: "status")
                                inputField(type: assetStatusTypeField) {
                                    ...inputfield
                                    validation(input: { value: required }) {
                                        ...validation
                                    }
                                }
                            }
                            assetType: metaData {
                                label(input: "metadata.labels.asset-type")
                                key(input: "assetType")
                                inputField(type: assetTypeTypeField) {
                                    ...inputfield
                                    validation(input: { value: required }) {
                                        ...validation
                                    }
                                }
                            }
                            dateAvailable: metaData {
                                label(input: "Datum beschikbaar")
                                key(input: "dateAvailable")
                                inputField(type: baseDateField) {
                                    ...inputfield 
                                }
                            }
                            links: metaData {
                                label(input: "Links")
                                key(input: "links")
                                inputField(type: baseTextField) {
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

    query GetAssetCreateForm {
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
                            validation(input: { value: required }) {
                                ...validation 
                            }
                        }
                    }
                    assetType: metaData {
                        label(input: "Asset type")
                        key(input: "assetType")
                        inputField(type: assetTypeTypeField) {
                            ...inputfield
                            validation(input: { value: required }) {
                                ...validation 
                            }
                        }
                    }
                    uploadContainer {
                        uploadFlow(input: optionalMediafiles)
                        fileUpload: uploadField {
                            label(input: "File upload")
                            uploadFieldType(input: single)
                            inputField(type: baseFileUploadField) {
                                ...inputfield 
                            }
                        }
                    }
                    createAction: action {
                        label(input: "actions.labels.create")
                        icon(input: Create)
                        actionType(input: submitWithUpload)
                        actionQuery(input: "CreateEntity")
                        creationType(input: asset)
                        showsFormErrors(input: true)
                    }
                }
            }
        }
    }

    fragment filtersForAsset on Asset {
        advancedFilters {
            title: advancedFilter(
                type: text
                key: ["dams:1|metadata.title.value"]
                label: "metadata.labels.title"
                isDisplayedByDefault: true
            ) { type key label isDisplayedByDefault }
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
                    { type: type, value: "asset" }
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
            assetType: advancedFilter(
                type: selection
                key: ["dams:1|metadata.assetType.value"]
                label: "metadata.labels.asset-type"
                useNewWayToFetchOptions: true
                filterOptionsMapping: {
                    label: "intialValues.assetType"
                    value: "intialValues.assetType"
                }
                isDisplayedByDefault: true
                advancedFilterInputForRetrievingOptions: [
                    {
                        type: text
                        key: ["dams:1|metadata.assetType.value"]
                        distinct_by: "metadata.assetType.value"
                        value: "*"
                    }
                    { type: type, value: "asset" }
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
                defaultValue(value: "asset")
                hidden(value: true)
            }
        }
    }

    fragment assetBulkOperations on Asset {
        bulkOperationOptions {
            options(
                input: [
                    {
                        icon: Create
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
                            formQuery: "GetAssetCreateForm"
                            formRelationType: "isAssetFor"
                            askForCloseConfirmation: true
                            neededPermission: cancreate
                        }
                    }
                    {
                        icon: DownloadAlt
                        label: "bulk-operations.download-mediafiles"
                        value: "downloadMediafiles"
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: someSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-someselected"
                        }
                        bulkOperationModal: {
                            typeModal: DynamicForm
                            formQuery: "GetDownloadMediafilesForm"
                            formRelationType: "hasAsset"
                            askForCloseConfirmation: true
                            neededPermission: cancreate
                        }
                    }
                    {
                        icon: FileExport
                        label: "bulk-operations.csv-export.assets"
                        value: "exportCsv"
                        bulkOperationModal: { typeModal: BulkOperations }
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: someSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-someselected"
                        }
                    }
                    {
                        icon: FileExport
                        label: "bulk-operations.csv-export.mediafiles-of-asset"
                        value: "exportCsvOfMediafilesFromAsset"
                        bulkOperationModal: { typeModal: BulkOperations }
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: someSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-someselected"
                        }
                    }
                    {
                        label: "bulk-operations.delete-selected"
                        value: "deleteEntities"
                        primary: false
                        bulkOperationModal: {
                            typeModal: BulkOperationsDeleteEntities
                            formQuery: "GetBulkRemovingAssetsForm"
                            askForCloseConfirmation: false
                            skipItemsWithRelationDuringBulkDelete: ["isAssetFor"]
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

    fragment assetSortOptions on Asset {
        sortOptions {
            options(input: [
                { icon: NoIcon, label: "metadata.labels.title", value: "title" }
                { icon: NoIcon, label: "metadata.labels.date-updated", value: "date_updated" }
            ]) { icon label value }
        }
    }

    query GetMediafilesInAsset(
        $type: Entitytyping!
        $limit: Int
        $skip: Int
        $searchValue: SearchFilter!
        $advancedSearchValue: [FilterInput]
        $advancedFilterInputs: [AdvancedFilterInput!]!
        $searchInputType: SearchInputType
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
                ... on MediaFileEntity {
                    intialValues {
                        id
                        filename: keyValue(key: "filename", source: root)
                        original_filename: keyValue(key: "original_filename", source: root)
                        transcode_filename: keyValue(
                            key: "display_filename"
                            source: root
                            # technicalOrigin: "transcode"
                        )
                        display_filename: keyValue(
                            key: "display_filename"
                            source: root
                            # technicalOrigin: "transcode"
                        )
                        original_file_location: keyValue(
                            key: "original_file_location"
                            source: root
                        )
                        transcode_file_location: keyValue(
                            key: "display_filename"
                            source: root
                            # technicalOrigin: "transcode"
                        )
                        thumbnail: keyValue(key: "display_filename", source: root)
                        mimetype: keyValue(key: "mimetype", source: root)
                        __typename
                    }
                    teaserMetadata {
                        thumbnail: thumbnail {
                            key(input: "thumbnail")
                            __typename
                        }
                        original_filename: metaData {
                            label(input: "metadata.labels.filename")
                            key(input: "original_filename")
                            __typename
                        }
                        contextMenuActions {
                            doLinkAction {
                                label(input: "contextMenu.contextMenuLinkAction.followLink")
                                icon(input: "AngleRight")
                                __typename
                            }
                            primaryMediafile: doGeneralAction {
                                label(
                                    input: "contextMenu.contextMenuGeneralAction.setPrimaryMediafile"
                                )
                                action(input: SetPrimaryMediafile)
                                icon(input: "Link")
                                __typename
                            }
                            primaryThumbnail: doGeneralAction {
                                label(
                                    input: "contextMenu.contextMenuGeneralAction.setPrimaryThumbnail"
                                )
                                action(input: SetPrimaryThumbnail)
                                icon(input: "ImageCheck")
                                __typename
                            }
                            deleteRelation: doElodyAction {
                                label(input: "contextMenu.contextMenuElodyAction.delete-relation")
                                action(input: DeleteRelation)
                                icon(input: "Trash")
                                __typename
                            }
                            deleteEntity: doElodyAction {
                                label(input: "contextMenu.contextMenuElodyAction.delete-entity")
                                action(input: DeleteEntity)
                                icon(input: "Trash")
                                __typename
                            }
                            __typename
                        }
                    }
                    relationValues
                    allowedViewModes {
                        viewModes(
                            input: [{ viewMode: ViewModesList }, { viewMode: ViewModesGrid }]
                        ) {
                            ...viewModes
                        }
                    }
                }
            }
            __typename
        }
        __typename
    }

    query GetMediafilesInAssetFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(type: type) {
                    type
                    defaultValue(value: "mediafile")
                    hidden(value: true)
                }
                technical_origin: advancedFilter(
                    type: text
                    key: ["elody:1|technical_origin"]
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "original")
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|relations.isMediafileFor.key"]
                ) {
                    type
                    key
                    defaultValue(value: "")
                    hidden(value: true)
                }
            }
        }
    }

    query GetPreviewInAsset {
        PreviewElement {
            column {
                size(size: hundred)
                elements {
                    entityListElement {
                        label(input: "element-labels.mediafiles-element")
                        type(input: media)
                        isCollapsed(input: false)
                        entityTypes(input: [mediafile])
                        baseLibraryMode(input: previewBaseLibrary)
                        relationType: label(input: "hasMediafile")
                        searchInputType(input: "AdvancedInputMediaFilesType")
                        customQuery(input: "GetMediafilesInAsset")
                        customQueryRelationType: label(input: "isMediafileFor")
                        customQueryFilters(input: "GetMediafilesInAssetFilters")
                        customBulkOperations(
                            input: "GetBulkOperationsForMediafilesInDetail"
                        )
                    }
                }
            }
        }
    }

    fragment previewForAsset on Asset {
        previewComponent {
            type(input: ColumnList)
            listItemsCoverage(input: OneListItem)
            previewQuery(input: "GetPreviewInAsset")
        }
    }

    query GetBulkOperationsForMediafilesInDetail {
        CustomBulkOperations {
            bulkOperationOptions {
                options(
                    input: [
                        {
                            icon: Create
                            label: "bulk-operations.add-new-relation"
                            value: "createEntity"
                            primary: true
                            actionContext: {
                                activeViewMode: readMode
                                entitiesSelectionType: noneSelected
                                labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                            }
                            bulkOperationModal: {
                                typeModal: DynamicForm
                                formQuery: "GetUploadMediafilesQuery"
                                askForCloseConfirmation: true
                                neededPermission: canupdate
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

    query GetPodiumhuis(
        $type: Entitytyping!
        $limit: Int
        $skip: Int
        $searchValue: SearchFilter!
        $advancedSearchValue: [FilterInput]
        $advancedFilterInputs: [AdvancedFilterInput!]!
        $searchInputType: SearchInputType
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
                ... on Podiumhuis {
                    intialValues {
                        name: keyValue(key: "name", source: metadata)
                    }
                    teaserMetadata {
                        name: metaData {
                            label(input: "metadata.labels.name")
                            key(input: "name")
                        }
                        contextMenuActions {
                            doLinkAction {
                                label(input: "contextMenu.contextMenuLinkAction.followLink")
                                icon(input: "AngleRight")
                                __typename
                            }
                            deleteEntity: doElodyAction {
                                label(input: "contextMenu.contextMenuElodyAction.delete-entity")
                                action(input: DeleteEntity)
                                icon(input: "Trash")
                                __typename
                            }
                        }
                    }
                }
            }
        }
    }
    
    query GetPodiumhuisFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(type: type) {
                    type
                    defaultValue(value: "podiumhuis")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasPodiumhuis.key")
                    hidden(value: true)
                }
            }
        }
    }

    query GetBulkOperationsForPodiumhuisInAsset {
        CustomBulkOperations {
            bulkOperationOptions {
                options(
                    input: [
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
`;
