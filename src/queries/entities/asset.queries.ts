import { gql } from "@apollo/client";

-----------------------------------------------------

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
      date_created: keyValue(key: "date_created", source: root)
      date_updated: keyValue(key: "date_updated", source: root)
      created_by: keyValue(key: "created_by", source: root)
      last_editor: keyValue(key: "last_editor", source: root)
    }

    entityView {
      column {
        size(size: seventy)
        elements {
          Mediafiles: entityListElement {
            label(input: "element-labels.mediafiles-element")
            type(input: media)
            isCollapsed(input: false)
            entityTypes(input: [mediafile])
            relationType: label(input: "hasMediafile")
            searchInputType(input: "AdvancedInputMediaFilesType")
            customQuery(input: "GetMediafilesInPodiumnet")
            customQueryRelationType: label(input: "isMediafileFor")
            customQueryFilters(input: "GetMediafilesInEntityFiltersPodiumnet")
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
              label(input: "panel-labels.description")
              panelType(input: metadata)
              isEditable(input: true)
              isCollapsed(input: false)

              title: metaData {
                label(input: "metadata.labels.title")
                key(input: "title")
                inputField(type: baseTextField) { ...inputfield }
              }

              description: metaData {
                label(input: "metadata.labels.description")
                key(input: "description")
                inputField(type: baseTextareaField) { ...inputfield }
              }

              assetStatus: metaData {
                label(input: "metadata.labels.asset-status")
                key(input: "assetStatus")
                inputField(type: baseSelectField) { ...inputfield }
              }

              availableForVenues: metaData {
                label(input: "metadata.labels.available-for-venues")
                key(input: "availableForVenues")
                inputField(type: baseBooleanField) { ...inputfield }
              }
            }

            history: panels {
              label(input: "panel-labels.history")
              panelType(input: metadata)
              isEditable(input: false)
              isCollapsed(input: false)
              date_created: metaData {
                label(input: "metadata.labels.date-created")
                key(input: "date_created")
                unit(input: DATETIME_DMY24)
              }
              created_by: metaData {
                label(input: "metadata.labels.created-by")
                key(input: "created_by")
              }
              date_updated: metaData {
                label(input: "metadata.labels.date-updated")
                key(input: "date_updated")
                unit(input: DATETIME_DMY24)
              }
              last_editor: metaData {
                label(input: "metadata.labels.last-editor")
                key(input: "last_editor")
              }
            }
          }
        }
      }
    }
  }

  query GetAssetCreateFormDemo {
    GetDynamicForm {
      label(input: "navigation.create-asset")
      asset: formTab {
        formFields {
          title: metaData {
            label(input: "metadata.labels.title")
            key(input: "title")
            inputField(type: baseTextField) {
              ...inputfield
              validation(input: { value: required }) { ...validation }
            }
          }
          assetStatus: metaData {
            label(input: "metadata.labels.asset-status")
            key(input: "assetStatus")
            inputField(type: baseSelectField) { ...inputfield }
          }
          availableForVenues: metaData {
            label(input: "metadata.labels.available-for-venues")
            key(input: "availableForVenues")
            inputField(type: baseBooleanField) { ...inputfield }
          }
          uploadContainer {
            uploadFlow(input: optionalMediafiles)
            fileUpload: uploadField {
              label(input: "upload-fields.labels.file-upload")
              uploadFieldType(input: single)
              inputField(type: baseFileUploadField) { ...inputfield }
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

  fragment filtersForAssetDemo on Asset {
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
        label: "metadata.labels.asset-status"
        isDisplayedByDefault: true
      ) { type key label isDisplayedByDefault }
      type: advancedFilter(type: type) {
        type
        defaultValue(value: "asset")
        hidden(value: true)
      }
    }
  }

  fragment assetSortOptionsDemo on Asset {
    sortOptions {
      options(input: [
        { icon: NoIcon, label: "metadata.labels.title", value: "title" }
        { icon: NoIcon, label: "metadata.labels.date-updated", value: "date_updated" }
      ]) { icon label value }
    }
  }
`;
