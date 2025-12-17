import { gql } from "graphql-modules";

export const mediafileQueries = gql`
    fragment minimalMediaFile on MediaFileEntity {
        intialValues {
            title: keyValue(key: "original_filename", source: root)
            thumbnail: keyValue(key: "display_filename", source: root)
            filename: keyValue(key: "filename", source: root)
            mimetype: keyValue(key: "mimetype", source: root)
            original_file_location: keyValue(
                key: "original_file_location"
                source: root
            )
            transcode_file_location: keyValue(
                key: "display_filename"
                source: root
                # technicalOrigin: "transcode"
            )
            display_filename: keyValue(
                key: "display_filename"
                source: root
                # technicalOrigin: "transcode"
            )
            height: keyValue(key: "img_height", source: root)
            width: keyValue(key: "img_width", source: root)
        }
        allowedViewModes {
            viewModes(
                input: [{ viewMode: ViewModesList }, { viewMode: ViewModesGrid }]
            ) {
                ...viewModes
            }
        }
        teaserMetadata {
            thumbnail {
                key(input: "thumbnail")
            }
            title: metaData {
                label(input: "metadata.labels.filename")
                key(input: "title")
            }
            mimetype: metaData {
                label(input: "metadata.labels.mimetype")
                key(input: "mimetype")
            }
        }
    }

    fragment fullMediafile on MediaFileEntity {
        intialValues {
            typePillLabel: keyValue(key: "type", source: typePillLabel, index: 0, formatter: "pill|auto")
            title: keyValue(key: "original_filename", source: root)
            filename: keyValue(key: "filename", source: root)
            original_filename: keyValue(key: "original_filename", source: root)
            original_file_location: keyValue(
                key: "original_file_location"
                source: root
            )
            transcode_file_location: keyValue(
                key: "display_filename"
                source: root
                # technicalOrigin: "transcode"
            )
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
            thumbnail_file_location: keyValue(
                key: "thumbnail_file_location"
                source: root
            )
            mimetype: keyValue(key: "mimetype", source: root)
            last_editor: keyValue(key: "last_editor", source: root)
            date_updated: keyValue(key: "date_updated", source: root)
        }
        relationValues
        entityView {
            column {
                elements {
                    singleMediaFileElement {
                        label(input: "element-labels.media-element")
                        isCollapsed(input: false)
                    }
                }
            }
            column2: column {
                size(size: thirty)
                elements {
                    windowElement {
                        label(input: "Metadata")
                        omschrijving: panels {
                            label(input: "panel-labels.description")
                            panelType(input: metadata)
                            isEditable(input: true)
                            isCollapsed(input: false)
                            title: metaData {
                                label(input: "metadata.labels.filename")
                                key(input: "title")
                            }
                            mimetype: metaData {
                                label(input: "metadata.labels.mimetype")
                                key(input: "mimetype")
                            }
                        }
                        technical_metadata: panels {
                            label(input: "panel-labels.technical-metadata")
                            panelType(input: bulkData)
                            isEditable(input: false)
                            isCollapsed(input: false)
                            bulkData(bulkDataSource: "technical_metadata")
                        }
                        history: panels {
                            label(input: "panel-labels.history")
                            panelType(input: metadata)
                            isEditable(input: false)
                            isCollapsed(input: false)
                            last_editor: metaData {
                                label(input: "metadata.labels.last-editor")
                                key(input: "last_editor")
                            }
                            date_updated: metaData {
                                label(input: "metadata.labels.date-updated")
                                key(input: "date_updated")
                                unit(input: DATETIME_DMY24)
                            }
                        }
                    }
                }
            }
        }
    }

    fragment mediafileSortOptions on MediaFileEntity {
        sortOptions {
            options(
                input: [
                    { icon: NoIcon, label: "metadata.labels.filename", value: "title" }
                    { icon: NoIcon, label: "metadata.labels.mimetype", value: "mimetype" }
                ]
            ) {
                icon
                label
                value
            }
        }
    }

    fragment previewForMediafile on MediaFileEntity {
        previewComponent {
            type(input: MediaViewer)
            listItemsCoverage(input: OneListItem)
            openByDefault(input: true)
            metadataPreviewQuery(input: "GetMetadataPreviewForMediafile")
        }
    }

    query GetMetadataPreviewForMediafile {
        PreviewElement {
            column {
                size(size: hundred)
                elements {
                    windowElement {
                        label(input: "panel-labels.other-metadata")
                        layout(input: HorizontalGrid)
                        original_filename: panels {
                            panelType(input: metadata)
                            isEditable(input: false)
                            isCollapsed(input: false)
                            metaData {
                                label(input: "metadata.labels.original-filename")
                                key(input: "original_filename")
                            }
                        }
                    }
                }
            }
        }
    }

    fragment filtersForMediafile on MediaFileEntity {
        advancedFilters {
            technical_origin: advancedFilter(
                type: text
                key: ["elody:1|technical_origin"]
            ) {
                type
                key
                hidden(value: true)
                defaultValue(value: "original")
            }
            filename: advancedFilter(
                type: text
                key: ["elody:1|properties.title.value"]
                label: "metadata.labels.filename"
                isDisplayedByDefault: true
            ) {
                type
                key
                label
                isDisplayedByDefault
            }
            mimetype: advancedFilter(
                type: text
                key: ["elody:1|metadata.mimetype"]
                label: "metadata.labels.mimetype"
                isDisplayedByDefault: true
            ) {
                type
                key
                label
                isDisplayedByDefault
            }
            ...entityAuditFilters
            type: advancedFilter(type: type) {
                type
                defaultValue(value: "mediafile")
                hidden(value: true)
            }
        }
    }

    fragment mediafileBulkOperations on MediaFileEntity {
        bulkOperationOptions {
            options(
                input: [
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
                            formRelationType: "hasMediafile"
                            askForCloseConfirmation: true
                            neededPermission: cancreate
                        }
                    }
                    {
                        icon: FileExport
                        label: "bulk-operations.csv-export.mediafiles"
                        value: "exportCsv"
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
                            askForCloseConfirmation: false
                        }
                        actionContext: {
                            activeViewMode: readMode
                            entitiesSelectionType: someSelected
                            labelForTooltip: "tooltip.bulkOperationsActionBar.someselected"
                        }
                    }
                ]
            ) {
                icon
                label
                value
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

    fragment mediafileAsPreview on MediaFileEntity {
        ...minimalBaseEntity
        intialValues {
            id
            filename: keyValue(key: "filename", source: root)
            original_filename: keyValue(key: "original_filename", source: root)
            transcode_filename: keyValue(
                key: "display_filename"
                source: root
                # technicalOrigin: "transcode"
            )
            original_file_location: keyValue(
                key: "original_file_location"
                source: root
            )
            transcode_file_location: keyValue(
                key: "transcode_file_location"
                source: root
                # technicalOrigin: "transcode"
            )
            display_filename: keyValue(
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
        }
        allowedViewModes {
            viewModes(
                input: [{ viewMode: ViewModesList }, { viewMode: ViewModesGrid }]
            ) {
                ...viewModes
            }
        }
        __typename
    }
`;
