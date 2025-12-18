import { gql } from "graphql-modules";

export const podiumhuisQueries = gql`
    fragment minimalPodiumhuis on Podiumhuis {
        intialValues {
            name: keyValue(key: "name", source: metadata)
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
            name: metaData {
                label(input: "metadata.labels.name")
                key(input: "name")
            }
        }
        ...minimalBaseEntity
    }

    fragment fullPodiumhuis on Podiumhuis {
        intialValues {
            typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
            name: keyValue(key: "name", source: metadata)
            description: keyValue(key: "description", source: metadata)
            url: keyValue(key: "url", source: metadata)
        }
        relationValues
        entityView {
            column {
                size(size: seventy)
                elements {
                    Users: entityListElement {
                        label(input: "element-labels.user-element")
                        isCollapsed(input: false)
                        entityTypes(input: [user])
                        relationType: label(input: "hasUser")
                        searchInputType(input: "AdvancedInputType")
                        customQuery(input: "GetUsersInPodiumhuis")
                        customQueryFilters(input: "GetUserInPodiumhuisFilter")
                        customBulkOperations(input: "GetBulkOperationsForUsersInPodiumhuis")
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
                            label(input: "panel-labels.podiumhuis-info")
                            panelType(input: metadata)
                            isCollapsed(input: false)
                            isEditable(input: true)
                            name: metaData {
                                label(input: "metadata.labels.name")
                                key(input: "name")
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
                            url: metaData {
                                label(input: "metadata.labels.url")
                                key(input: "url")
                                inputField(type: baseTextareaField) {
                                    ...inputfield
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    fragment podiumhuisSortOptions on Podiumhuis {
        sortOptions {
            options(
                input: [
                    { icon: NoIcon, label: "metadata.labels.name", value: "name" }
                ]
            ) {
                icon
                label
                value
            }
        }
    }

    query GetPodiumhuisCreateForm {
        GetDynamicForm {
            label(input: "navigation.create-podiumhuis")
            podiumhuis: formTab {
                formFields {
                    name: metaData {
                        label(input: "metadata.labels.name")
                        key(input: "name")
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
                    createAction: action {
                        label(input: "actions.labels.create")
                        icon(input: Create)
                        actionType(input: submit)
                        actionQuery(input: "CreateEntity")
                        creationType(input: podiumhuis)
                    }
                }
            }
        }
    }

    fragment filtersForPodiumhuis on Podiumhuis {
        advancedFilters {
            name: advancedFilter(
                type: text
                key: ["vliz:1|properties.name.value"]
                label: "metadata.labels.name"
                isDisplayedByDefault: true
            ) {
                type
                key
                label
                isDisplayedByDefault
                tooltip(value: true)
            }
            type: advancedFilter(type: type) {
                type
                defaultValue(value: "podiumhuis")
                hidden(value: true)
            }
        }
    }

    fragment podiumhuisBulkOperations on Podiumhuis {
        bulkOperationOptions {
            options(
                input: [
                    {
                        icon: Create
                        label: "bulk-operations.create-podiumhuis"
                        value: "createEntity"
                        primary: true
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: noneSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.readmode-noneselected"
                        }
                        bulkOperationModal: {
                            typeModal: DynamicForm
                            formQuery: "GetPodiumhuisCreateForm"
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
    
    query GetUsersInPodiumhuis(
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
                ... on User {
                    intialValues {
                        email: keyValue(key: "email", source: metadata)
                        roles: keyValue(
                            key: "roles"
                            source: relationRootdata
                            relationKey: "isUserFor"
                            uuid: $userUuid
                        )
                    }
                    teaserMetadata {
                        email: metaData {
                            label(input: "metadata.labels.email")
                            key(input: "email")
                        }
                        roles: relationRootData {
                            label(input: "metadata.labels.roles")
                            key(input: "roles")
                            inputField(type: rolesTypeField) {
                                ...inputfield
                            }
                        }
                        contextMenuActions {
                            doLinkAction {
                                label(input: "contextMenu.contextMenuLinkAction.followLink")
                                icon(input: "AngleRight")
                                __typename
                            }
                            doElodyAction {
                                label(input: "contextMenu.contextMenuElodyAction.delete-relation")
                                action(input: DeleteRelation)
                                icon(input: "Trash")
                                __typename
                            }
                        }
                    }
                    allowedViewModes {
                        viewModes(input: [
                            { viewMode: ViewModesList }
                            { viewMode: ViewModesGrid }
                        ]) {
                            ...viewModes
                        }
                    }
                }
            }
            __typename
        }
    }
    
    query GetUserInPodiumhuisFilter($entityType: String!) {
        EntityTypeFilters(type: $entityType) {
            advancedFilters {
                advancedFilter(type: type) {
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
    
        query GetBulkOperationsForUsersInPodiumhuis {
        CustomBulkOperations {
            bulkOperationOptions {
                options(
                    input: [
                        {
                            primary: true
                            icon: PlusCircle
                            label: "bulk-operations.add-relation"
                            value: "addRelation"
                            actionContext: {
                                activeViewMode: [readMode],
                                entitiesSelectionType: noneSelected
                                labelForTooltip: "tooltip.bulkOperationsActionBar.noneselected"
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
