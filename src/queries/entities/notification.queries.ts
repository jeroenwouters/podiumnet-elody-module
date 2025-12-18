import { gql } from "graphql-modules";

export const notificationQueries = gql`
    fragment minimalNotification on Notification {
        intialValues {
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
            title: metaData {
                label(input: "metadata.labels.subject")
                key(input: "title")
            }
            status: metaData {
                label(input: "metadata.labels.status")
                key(input: "status")
            }
        }
        ...minimalBaseEntity
    }

    fragment fullNotification on Notification {
        intialValues {
            typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
            ...entityAuditIntialValues
            title: keyValue(key: "title", source: metadata)
            status: keyValue(key: "status", source: metadata, formatter: "pill")
            dateCreated: keyValue(key: "dateCreated", source: metadata)
            dateSend: keyValue(key: "dateSend", source: metadata)
            includedAssets: keyValue(key: "includedAssets", source: metadata)
        }
        relationValues
        entityView {
            column {
                size(size: seventy)
                elements {
                    windowElement {
                        label(input: "window-element-labels.info-window")
                        expandButtonOptions {
                            shown(input: true)
                        }
                        info: panels {
                            label(input: "panel-labels.notification-info")
                            panelType(input: metadata)
                            isCollapsed(input: false)
                            isEditable(input: true)
                            title: metaData {
                                label(input: "metadata.labels.subject")
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
                                inputField(type: notificationStatusTypeField) {
                                    ...inputfield
                                    validation(input: { value: required }) {
                                        ...validation
                                    }
                                }
                            }
                            includedAssets: metaData {
                                label(input: "metadata.labels.included-assets")
                                key(input: "includedAssets")
                                inputField(type: includedAssetsTypeField) {
                                    ...inputfield
                                    validation(input: { value: required }) {
                                        ...validation
                                    }
                                }
                            }
                            dateCreated: metaData {
                                label(input: "metadata.labels.date-created")
                                key(input: "dateCreated")
                                inputField(type: baseDateField) {
                                    ...inputfield
                                }
                            }
                            dateSend: metaData {
                                label(input: "metadata.labels.date-send")
                                key(input: "dateSend")
                                inputField(type: baseDateField) {
                                    ...inputfield
                                }
                            }
                        }
                    }
                    SendToUsers: entityListElement {
                        label(input: "element-labels.send-to-users-element")
                        isCollapsed(input: false)
                        entityTypes(input: [user])
                        relationType: label(input: "hasUser")
                        searchInputType(input: "AdvancedInputType")
                        customQuery(input: "GetUsers")
                        customQueryFilters(input: "GetUsersInNotificationFilters")
                        customBulkOperations(input: "GetBulkOperationsForUsersInNotification")
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

    fragment notificationSortOptions on Notification {
        sortOptions {
            options(
                input: [
                    { icon: NoIcon, label: "metadata.labels.subject", value: "title" }
                    { icon: NoIcon, label: "metadata.labels.status", value: "status" }
                    { icon: NoIcon, label: "metadata.labels.date-created", value: "dateCreated" }
                ]
            ) {
                icon
                label
                value
            }
        }
    }

    query GetNotificationCreateForm {
        GetDynamicForm {
            label(input: "navigation.create-notification")
            Notification: formTab {
                formFields {
                    title: metaData {
                        label(input: "metadata.labels.subject")
                        key(input: "title")
                        inputField(type: baseTextField) {
                            ...inputfield
                            validation(input: { value: required }) {
                                ...validation
                            }
                        }
                    }
                    includedAssets: metaData {
                        label(input: "metadata.labels.included-assets")
                        key(input: "includedAssets")
                        inputField(type: includedAssetsTypeField) {
                            ...inputfield
                            validation(input: { value: required }) {
                                ...validation
                            }
                        }
                    }
                    status: metaData {
                        label(input: "metadata.labels.status")
                        key(input: "status")
                        inputField(type: notificationStatusTypeField) {
                            ...inputfield
                            validation(input: { value: required }) {
                                ...validation
                            }
                        }
                    }
                    createAction: action {
                        label(input: "actions.labels.create")
                        icon(input: Create)
                        actionType(input: submit)
                        actionQuery(input: "CreateEntity")
                        creationType(input: notification)
                    }
                }
            }
        }
    }

    fragment filtersForNotification on Notification {
        advancedFilters {
            id: advancedFilter(
                type: selection
                key: ["vlacc:1|id"]
                label: "metadata.labels.id"
                selectionOption: autocomplete
                isDisplayedByDefault: true
                filterOptionsMapping: {
                    label: "intialValues.id"
                    value: "intialValues.id"
                }
                useNewWayToFetchOptions: true
                advancedFilterInputForRetrievingOptions: [
                    {
                        type: text
                        key: ["vlacc:1|id"]
                        value: "*"
                        distinct_by: "id"
                        match_exact: false
                    }
                    { type: type, value: "notification" }
                ]
            ) {
                ...advancedFilter
            }
            title: advancedFilter(
                type: text
                key: ["dams:1|metadata.title.value"]
                label: "metadata.labels.subject"
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
                    { type: type, value: "notification" }
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
                defaultValue(value: "notification")
                hidden(value: true)
            }
        }
    }
    
    fragment notificationBulkOperations on Notification {
        bulkOperationOptions {
            options(
                input: [
                    {
                        icon: Create
                        label: "bulk-operations.create-notification"
                        value: "createEntity"
                        primary: true
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: noneSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                        }
                        bulkOperationModal: {
                            typeModal: DynamicForm
                            formQuery: "GetNotificationCreateForm"
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

    query GetPreviewInNotification {
        PreviewElement {
            column {
                size(size: hundred)
                elements {
                    entityListElement {
                        label(input: "element-labels.send-to-users-element")
                        isCollapsed(input: false)
                        entityTypes(input: [user])
                        baseLibraryMode(input: previewBaseLibrary)
                        relationType: label(input: "hasNotification")
                        searchInputType(input: "AdvancedInputType")
                        customQuery(input: "GetUsers")
                        customQueryFilters(input: "GetUsersInNotificationFilters")
                    }
                }
            }
        }
    }

    fragment previewForNotification on Notification {
        previewComponent {
            type(input: ColumnList)
            listItemsCoverage(input: OneListItem)
            previewQuery(input: "GetPreviewInNotification")
        }
    }

    query GetUsersInNotificationFilters($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                type: advancedFilter(type: type) {
                    type
                    defaultValue(value: "user")
                    hidden(value: true)
                }
                relation: advancedFilter(
                    type: selection
                    key: ["elody:1|identifiers"]
                ) {
                    type
                    key
                    defaultValue(value: "$entity.relationValues.hasUser.key")
                    hidden(value: true)
                }
            }
        }
    }
    
    query GetUsers(
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
            }
            __typename
        }
    }

    query GetBulkOperationsForUsersInNotification {
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
