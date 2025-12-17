import { gql } from "@apollo/client";
import {podiumnetFields} from "../../sources/forms";

export const assetQueries = gql`
    fragment minimalAsset on Asset {
        ...minimalBaseEntity
        intialValues {
            title: keyValue(key: "title", source: metadata)
            date_updated: keyValue(key: "date_updated", source: root)
        }
        teaserMetadata {
            thumbnail: thumbnail {
                filename(fromMediafile: true)
            }
            title: metaData {
                label(input: "metadata.labels.title")
                key(input: "title")
            }
        }
    }

    fragment fullAsset on Asset {
        intialValues {
            title: keyValue(key: "title", source: metadata)
            description: keyValue(key: "description", source: metadata)
            assetStatus: keyValue(key: "assetStatus", source: metadata)
            assetType: keyValue(key: "assetType", source: metadata)
            dateAvailable: keyValue(key: "dateAvailable", source: metadata)
            availableForVenues: keyValue(key: "availableForVenues", source: metadata)
            ...entityAuditIntialValues
        }

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
                            assetStatus: metaData {
                                label(input: "Asset status")
                                key(input: "assetStatus")
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
                            dateAvailable: metaData {
                                label(input: "Datum beschikbaar")
                                key(input: "dateAvailable")
                                inputField(type: baseDateField) {
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
                    assetStatus: metaData {
                        label(input: "Asset status")
                        key(input: "assetStatus")
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
            assetStatus: advancedFilter(
                type: selection
                key: ["dams:1|metadata.assetStatus.value"]
                label: "Asset status"
                isDisplayedByDefault: true
            ) { type key label isDisplayedByDefault }
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
                    key: ["dams:1|technical_origin"]
                ) {
                    type
                    key
                    hidden(value: true)
                    defaultValue(value: "original")
                }
                relation: advancedFilter(
                    type: selection
                    key: ["dams:1|relations.isMediafileFor.key"]
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
`;
