import { gql } from "graphql-modules";

export const podiumnetQueries = gql`
    fragment typePillsIntialValues on IntialValues {
        type: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
    }

    fragment typePillsTeaserMetadata on teaserMetadata {
        type: metaData {
            label(input: "metadata.labels.type")
            key(input: "type")
        }
    }

    fragment fullEntity on Entity {
        id
        uuid
        type
        ... on User {
            ...fullUser
        }
        ... on Tenant {
            ...fullTenant
        }
        ... on MediaFileEntity {
            ...fullMediafile
        }
        ... on Asset {
            ...fullAsset
        }
        ... on Production {
            ...fullProduction
        }
        ... on Notification {
            ...fullNotification
        }
        ... on Podiumhuis {
            ...fullPodiumhuis
        }
    }

    query getEntities(
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
                ... on User {
                    ...minimalUser
                }
                ... on Tenant {
                    ...minimalTenant
                }
                ... on MediaFileEntity {
                    ...minimalMediaFile
                }
                ... on Asset {
                    ...minimalAsset
                }
                ... on Production {
                    ...minimalProduction
                }
                ... on Notification {
                    ...minimalNotification
                }
                ... on Podiumhuis {
                    ...minimalPodiumhuis
                }
            }
        }
    }

    query getTenants {
        Tenants {
            count
            limit
            results {
                id
                uuid
                type
                ... on Tenant {
                    ...minimalTenant
                }
            }
        }
    }

    query getEntityById($id: String!, $type: String!) {
        Entity(id: $id, type: $type) {
            ...fullEntity
        }
    }

    query getDirectories($dir: String) {
        Directories(dir: $dir) {
            id
            dir
            has_subdirs
            parent
        }
    }

    query getAdvancedFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            ... on User {
                ...filtersForUser
            }
            ... on Tenant {
                ...tenantFilters
            }
            ... on MediaFileEntity {
                ...filtersForMediafile
            }
            ... on Asset {
                ...filtersForAsset
            }
            ... on Production {
                ...filtersForProduction
            }
            ... on Notification {
                ...filtersForNotification
            }
            ... on Podiumhuis {
                ...filtersForPodiumhuis
            }
        }
    }

    query getFilterOptions(
        $input: [AdvancedFilterInput!]!
        $limit: Int!
        $entityType: String!
    ) {
        FilterOptions(input: $input, limit: $limit, entityType: $entityType) {
            label
            value
        }
    }

    query getUserPermissions {
        UserPermissions {
            payload
        }
    }

    mutation postStartImport($folder: String!) {
        postStartImport(folder: $folder) {
            message_id
            status
            count
        }
    }

    mutation linkMediafileToEntity(
        $entityId: String!
        $mediaFileInput: MediaFileInput!
    ) {
        linkMediafileToEntity(
            entityId: $entityId
            mediaFileInput: $mediaFileInput
        ) {
            _id
            filename
            original_file_location
            thumbnail_file_location
            mimetype
            metadata {
                key
                value
            }
        }
    }

    mutation patchMediaFileMetadata(
        $mediafileId: String!
        $mediaFileInput: [MediaFileMetadataInput]!
    ) {
        patchMediaFileMetadata(
            MediafileId: $mediafileId
            MediaFileMetadata: $mediaFileInput
        ) {
            _id
            filename
        }
    }

    mutation mutateEntityValues(
        $id: String!
        $formInput: EntityFormInput!
        $collection: Collection!
    ) {
        mutateEntityValues(
            id: $id
            formInput: $formInput
            collection: $collection
        ) {
            ...fullEntity
        }
    }

    mutation deleteData(
        $id: String!
        $path: Collection!
        $deleteMediafiles: Boolean!
    ) {
        deleteData(id: $id, path: $path, deleteMediafiles: $deleteMediafiles)
    }

    mutation bulkDeleteEntities(
        $ids: [String!]!
        $path: Collection!
        $deleteEntities: DeleteEntitiesInput
    ) {
        bulkDeleteEntities(ids: $ids, path: $path, deleteEntities: $deleteEntities)
    }

    mutation CreateEntity($entity: EntityInput!) {
        CreateEntity(entity: $entity) {
            ...fullEntity
        }
    }

    mutation BulkAddRelations(
        $entityIds: [String!]!
        $relationEntityId: String!
        $relationType: String!
    ) {
        bulkAddRelations(
            entityIds: $entityIds
            relationEntityId: $relationEntityId
            relationType: $relationType
        )
    }

    query GetBulkOperationsRelationForm {
        BulkOperationsRelationForm {
            label(input: "bulk-operations.bulk-edit.bulk-edit-title")
            relations: panels {
                ... on WindowElementPanel {
                    label(input: "bulk-operations.bulk-edit.relation-types")
                    panelType(input: metadata)
                    isEditable(input: true)
                    isCollapsed(input: false)
                }
            }
        }
    }

    query GetMenu($name: String!) {
        Menu(name: $name) {
            menu {
                name
                productions: menuItem(
                    label: "navigation.productions"
                    entityType: production
                    typeLink: { route: { destination: "productions" } }
                    icon: Palette
                    requiresAuth: true
                ) {
                    label
                    entityType
                    typeLink {
                        route {
                            destination
                        }
                    }
                    icon
                    requiresAuth
                }
                assets: menuItem(
                    label: "navigation.assets"
                    entityType: asset
                    typeLink: { route: { destination: "assets" } }
                    icon: BookOpen
                    requiresAuth: true
                ) {
                    label
                    entityType
                    typeLink {
                        route {
                            destination
                        }
                    }
                    icon
                    requiresAuth
                }
                mediafile: menuItem(
                    label: "navigation.mediafiles"
                    entityType: mediafile
                    typeLink: { route: { destination: "mediafiles" } }
                    icon: Image
                    requiresAuth: true
                ) {
                    label
                    entityType
                    icon
                    requiresAuth
                    typeLink {
                        route {
                            destination
                        }
                    }
                }
                upload: menuItem(
                    label: "navigation.upload"
                    icon: Upload
                    isLoggedIn: true
                    typeLink: { route: { destination: "Home" } }
                ) {
                    label
                    icon
                    isLoggedIn
                    typeLink {
                        route {
                            destination
                        }
                    }
                    subMenu(name: "sub-menu-upload") {
                        name
                        GetUploadEntitiesWithMediafiles: menuItem(
                            label: "navigation.upload-entities-with-mediafiles"
                            entityType: asset
                            typeLink: {
                                modal: {
                                    typeModal: DynamicForm
                                    formQuery: "GetUploadEntitiesWithMediafiles"
                                    neededPermission: cancreate
                                }
                            }
                        ) {
                            label
                            entityType
                            typeLink {
                                modal {
                                    typeModal
                                    formQuery
                                    neededPermission
                                }
                            }
                        }
                    }
                    subMenu(name: "sub-menu-upload") {
                        name
                        GetUploadEntitiesWithoutMediafiles: menuItem(
                            label: "navigation.upload-entities-without-mediafiles"
                            entityType: asset
                            typeLink: {
                                modal: {
                                    typeModal: DynamicForm
                                    formQuery: "GetUploadEntitiesWithoutMediafiles"
                                    neededPermission: cancreate
                                }
                            }
                        ) {
                            label
                            entityType
                            typeLink {
                                modal {
                                    typeModal
                                    formQuery
                                    neededPermission
                                }
                            }
                        }
                    }
                }
                new: menuItem(
                    label: "navigation.new"
                    icon: Create
                    isLoggedIn: true
                    typeLink: { route: { destination: "Home" } }
                ) {
                    label
                    icon
                    isLoggedIn
                    typeLink {
                        route {
                            destination
                        }
                    }
                    subMenu(name: "sub-menu-create") {
                        name
                        asset: menuItem(
                            label: "navigation.create-asset"
                            entityType: asset
                            typeLink: {
                                modal: {
                                    typeModal: DynamicForm
                                    formQuery: "GetAssetCreateForm"
                                    neededPermission: cancreate
                                }
                            }
                        ) {
                            label
                            entityType
                            typeLink {
                                modal {
                                    typeModal
                                    formQuery
                                    neededPermission
                                }
                            }
                        }
                        productions: menuItem(
                            label: "navigation.create-production"
                            entityType: production
                            typeLink: {
                                modal: {
                                    typeModal: DynamicForm
                                    formQuery: "GetProductionCreateForm"
                                    neededPermission: cancreate
                                }
                            }
                        ) {
                            label
                            entityType
                            typeLink {
                                modal {
                                    typeModal
                                    formQuery
                                    neededPermission
                                }
                            }
                        }
                    }
                }
                podiumhuis: menuItem(
                    label: "navigation.podiumhuizen"
                    entityType: asset
                    typeLink: { route: { destination: "podiumhuizen" } }
                    icon: Home
                    requiresAuth: true
                ) {
                    label
                    entityType
                    typeLink {
                        route {
                            destination
                        }
                    }
                    icon
                    requiresAuth
                }
            }
        }
    }

    query GetDropzoneEntityToCreate {
        DropzoneEntityToCreate {
            options(
                input: [{ icon: NoIcon, label: "navigation.media", value: "media" }]
            ) {
                icon
                label
                value
            }
        }
    }

    query GetSortOptions($entityType: String!) {
        EntityTypeSortOptions(entityType: $entityType) {
            ... on BaseEntity {
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
            ... on User {
                ...userSortOptions
            }
            ... on Tenant {
                ...tenantSortOptions
            }
            ... on MediaFileEntity {
                ...mediafileSortOptions
            }
            ... on Asset {
                ...assetSortOptions
            }
            ... on Production {
                ...productionSortOptions
            }
            ... on Notification {
                ...notificationSortOptions
            }
            ... on Podiumhuis {
                ...podiumhuisSortOptions
            }
        }
    }

    query GetPaginationLimitOptions {
        PaginationLimitOptions {
            options(
                input: [
                    { icon: ListOl, label: "20", value: 20 }
                    { icon: ListOl, label: "50", value: 50 }
                    { icon: ListOl, label: "100", value: 100 }
                ]
            ) {
                icon
                label
                value
            }
        }
    }

    query GetBulkOperations($entityType: String!) {
        BulkOperations(entityType: $entityType) {
            ... on BaseEntity {
                bulkOperationOptions {
                    options(
                        input: [
                          { icon: Edit, label: "bulk-operations.edit", value: "edit" }
                        ]
                    ) {
                        icon
                        label
                        value
                    }
                }
            }
            ... on Asset {
                ...assetBulkOperations
            }
            ... on Production {
                ...productionBulkOperations
            }
            ... on Notification {
                ...notificationBulkOperations
            }
            ... on Podiumhuis {
                ...podiumhuisBulkOperations
            }
            ... on MediaFileEntity {
                ...mediafileBulkOperations
            }
        }
    }

    query GetEntityPickerForm {
        GetDynamicForm {
            import: formTab {
                formFields {
                    entityPicker: metaData {
                        label(input: "metadata.labels.entity-picker")
                        key(input: "entityPicker")
                        inputField(type: baseEntityPickerField) {
                            ...inputfield
                        }
                    }
                }
            }
        }
    }

    query GetEntityPickerFormWithUploadTab {
        GetDynamicForm {
            import: formTab {
                formFields {
                    entityPicker: metaData {
                        label(input: "metadata.labels.entity-picker")
                        key(input: "entityPicker")
                        inputField(type: baseEntityPickerField) {
                            ...inputfield
                        }
                    }
                }
            }
            upload: formTab {
                formFields {
                    uploadContainer {
                        uploadFlow(input: mediafilesOnly)
                        fileUpload: uploadField {
                            label(input: "upload-fields.labels.file-upload")
                            uploadFieldSize(input: normal)
                            uploadFieldType(input: single)
                            inputField(type: baseFileUploadField) {
                                ...inputfield
                            }
                        }
                    }
                    uploadAction: action {
                        label(input: "actions.labels.upload")
                        icon(input: Upload)
                        actionType(input: upload)
                        showsFormErrors(input: true)
                        actionProgressIndicator {
                            type(input: progressSteps)
                            prepareStep: step {
                                label(input: "actions.progress-steps.prepare")
                                stepType(input: prepare)
                                status
                            }
                            uploadStep: step {
                                label(input: "actions.progress-steps.upload")
                                stepType(input: upload)
                                status
                            }
                        }
                    }
                }
            }
        }
    }

    query GetBulkOperationCsvExportKeys($entityType: String!) {
        BulkOperationCsvExportKeys(entityType: $entityType) {
            options {
                icon
                label
                value
            }
        }
    }

    query getFilterMatcherMapping {
        FilterMatcherMapping {
            text
            date
            number
            selection
            boolean
            type
        }
    }

    query getPreviewComponents($entityType: String!) {
        PreviewComponents(entityType: $entityType) {
            ... on Asset {
                ...previewForAsset
            }
            ... on Production {
                ...previewForProduction
            }
            ... on Notification {
                ...previewForNotification
            }
#            ... on Podiumhuis {
#                ...previewForPodiumhuis
#            }
            ... on MediaFileEntity {
                ...previewForMediafile
            }
        }
    }

    query GetPermissionMappingPerEntityType($type: String!) {
        PermissionMappingPerEntityType(type: $type)
    }

    query GetPermissionMappingCreate($entityType: String!) {
        PermissionMappingCreate(entityType: $entityType)
    }

    query GetPermissionMappingEntityDetail($id: String!, $entityType: String!) {
        PermissionMappingEntityDetail(id: $id, entityType: $entityType) {
            permission
            hasPermission
        }
    }

    query FetchMediafilesOfEntity($entityIds: [String!]!) {
        FetchMediafilesOfEntity(entityIds: $entityIds) {
            __typename
        }
    }

    mutation updateMetadataWithCsv($entityType: String!, $csv: String!) {
        updateMetadataWithCsv(entityType: $entityType, csv: $csv)
    }

    query GetUploadMediafilesQuery {
        GetDynamicForm {
            upload: formTab {
                formFields {
                    uploadContainer {
                        uploadFlow(input: mediafilesOnly)
                        fileUpload: uploadField {
                            label(input: "upload-fields.labels.file-upload")
                            uploadFieldSize(input: normal)
                            uploadFieldType(input: single)
                            inputField(type: baseFileUploadField) {
                                ...inputfield
                            }
                        }
                    }
                    uploadAction: action {
                        label(input: "actions.labels.upload")
                        icon(input: Upload)
                        actionType(input: upload)
                        showsFormErrors(input: true)
                        actionProgressIndicator {
                            type(input: progressSteps)
                            prepareStep: step {
                                label(input: "actions.progress-steps.prepare")
                                stepType(input: prepare)
                                status
                            }
                            uploadStep: step {
                                label(input: "actions.progress-steps.upload")
                                stepType(input: upload)
                                status
                            }
                        }
                    }
                }
            }
        }
    }

    query GetImportExistingEntityQuery {
        GetDynamicForm {
            import: formTab {
                formFields {
                    entityPicker: metaData {
                        label(input: "metadata.labels.entity-picker")
                        key(input: "entityPicker")
                        inputField(type: baseEntityPickerField) {
                            ...inputfield
                        }
                    }
                }
            }
        }
    }

    query GetUploadEntitiesWithMediafiles {
        GetDynamicForm {
            upload: formTab {
                formFields {
                    uploadContainer {
                        uploadFlow(input: mediafilesWithRequiredCsv)
                        #            standaloneUploadType: uploadMetadata {
                        #              label(input: "metadata.labels.type")
                        #              key(input: "standaloneUploadType")
                        #              inputField(type: uploadEntityTypeTypeField) {
                        #                ...inputfield
                        #                validation(input: { value: required }) {
                        #                  ...validation
                        #                }
                        #              }
                        #            }
                        csvUpload: uploadField {
                            label(input: "upload-fields.labels.csv-upload")
                            uploadFieldSize(input: small)
                            dryRunUpload(input: true)
                            uploadFieldType(input: batch)
                            templateCsvs(input: [
                                "upload-csv-template-media-with-mediafiles.csv"
                                "upload-csv-template-map-with-mediafiles.csv"
                                "upload-csv-template-document-with-mediafiles.csv"
                            ])
                            infoLabelUrl(input: "https://github.com/inuits/elody-docs/blob/master/mkdocs/docs/csv-vliz-import-example.md")
                            inputField(type: baseCsvUploadField) {
                                validation(input: { value: required }) {
                                    ...validation
                                }
                                ...inputfield
                            }
                        }
                        fileUpload: uploadField {
                            label(input: "upload-fields.labels.file-upload")
                            uploadFieldSize(input: normal)
                            uploadFieldType(input: batch)
                            inputField(type: baseFileUploadField) {
                                ...inputfield
                            }
                        }
                    }
                    uploadAction: action {
                        label(input: "actions.labels.upload")
                        icon(input: Upload)
                        actionType(input: upload)
                        showsFormErrors(input: true)
                        actionProgressIndicator {
                            type(input: progressSteps)
                            validationStep: step {
                                label(input: "actions.progress-steps.validate")
                                stepType(input: validate)
                                status
                            }
                            prepareStep: step {
                                label(input: "actions.progress-steps.prepare")
                                stepType(input: prepare)
                                status
                            }
                            uploadStep: step {
                                label(input: "actions.progress-steps.upload")
                                stepType(input: upload)
                                status
                            }
                        }
                    }
                }
            }
        }
    }

    query GetUploadEntitiesWithoutMediafiles {
        GetDynamicForm {
            upload: formTab {
                formFields {
                    uploadContainer {
                        uploadFlow(input: csvOnly)
                        csvUpload: uploadField {
                            label(input: "upload-fields.labels.csv-upload")
                            uploadFieldSize(input: small)
                            dryRunUpload(input: true)
                            uploadFieldType(input: batch)
                            templateCsvs(input: [
                                "upload-csv-template-media-without-mediafiles.csv"
                                "upload-csv-template-map-without-mediafiles.csv"
                                "upload-csv-template-document-without-mediafiles.csv"
                            ])
                            infoLabelUrl(input: "https://github.com/inuits/elody-docs/blob/master/mkdocs/docs/csv-vliz-import-example.md")
                            inputField(type: baseCsvUploadField) {
                                validation(input: { value: required }) {
                                    ...validation
                                }
                                ...inputfield
                            }
                        }
                    }
                    uploadAction: action {
                        label(input: "actions.labels.upload")
                        icon(input: Upload)
                        actionType(input: upload)
                        showsFormErrors(input: true)
                        actionProgressIndicator {
                            type(input: progressSteps)
                            validationStep: step {
                                label(input: "actions.progress-steps.validate")
                                stepType(input: validate)
                                status
                            }
                            prepareStep: step {
                                label(input: "actions.progress-steps.prepare")
                                stepType(input: prepare)
                                status
                            }
                            uploadStep: step {
                                label(input: "actions.progress-steps.upload")
                                stepType(input: upload)
                                status
                            }
                        }
                    }
                }
            }
        }
    }
`;
