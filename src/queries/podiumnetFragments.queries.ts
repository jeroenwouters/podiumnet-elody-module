// @ts-ignore
import { gql } from "graphql-modules";

export const podiumnetFragments = gql`

    fragment entityAuditIntialValues on IntialValues {
        created_at: keyValue(key: "audit.created.at", source: root)
        created_by: keyValue(key: "audit.created.by", source: root, formatter: "link|user")
        updated_at: keyValue(key: "audit.updated.at", source: root)
        updated_by: keyValue(key: "audit.updated.by", source: root, formatter: "link|user")
    }

    fragment entityAuditMetadata on WindowElementPanel {
        created_at: metaData {
            label(input: "metadata.labels.created-at")
            key(input: "created_at")
            unit(input: DATETIME_DEFAULT)
        }
        created_by: metaData {
            label(input: "metadata.labels.created-by")
            key(input: "created_by")
        }
        updated_at: metaData {
            label(input: "metadata.labels.updated-at")
            key(input: "updated_at")
            unit(input: DATETIME_DEFAULT)
        }
        updated_by: metaData {
            label(input: "metadata.labels.updated-by")
            key(input: "updated_by")
        }
    }

    fragment entityAuditFilters on AdvancedFilters {
        created_at: advancedFilter(
            type: date
            key: ["vlacc:1|audit.created.at"]
            label: "metadata.labels.created-at"
            showTimeForDateFilter: true
            isDisplayedByDefault: true
        ) {
            type
            key
            label
            showTimeForDateFilter
            isDisplayedByDefault
            tooltip(value: true)
        }
        created_by: advancedFilter(
            type: selection
            key: ["vlacc:1|audit.created.by"]
            label: "metadata.labels.created-by"
            selectionOption: autocomplete
            isDisplayedByDefault: true
            useNewWayToFetchOptions: true
            filterOptionsMapping: {
                label: "intialValues.name"
            }
            advancedFilterInputForRetrievingOptions: [
                {
                    type: text
                    key: ["vlacc:1|properties.name.value"]
                    value: "*"
                    match_exact: false
                },
                {
                    type: type
                    value: user
                }
            ]
        ) {
            type
            key
            label
            selectionOption
            isDisplayedByDefault
            useNewWayToFetchOptions
            filterOptionsMapping {
                label
                value
            }
            advancedFilterInputForRetrievingOptions {
                type
                key
                value
                match_exact
            }
            tooltip(value: true)
        }
        updated_at: advancedFilter(
            type: date
            key: ["vlacc:1|audit.updated.at"]
            label: "metadata.labels.updated-at"
            showTimeForDateFilter: true
            isDisplayedByDefault: true
        ) {
            type
            key
            label
            showTimeForDateFilter
            isDisplayedByDefault
            tooltip(value: true)
        }
        updated_by: advancedFilter(
            type: selection
            key: ["vlacc:1|audit.updated.by"]
            label: "metadata.labels.updated-by"
            selectionOption: autocomplete
            isDisplayedByDefault: true
            useNewWayToFetchOptions: true
            filterOptionsMapping: {
                label: "intialValues.name"
            }
            advancedFilterInputForRetrievingOptions: [
                {
                    type: text
                    key: ["vlacc:1|properties.name.value"]
                    value: "*"
                    match_exact: false
                },
                {
                    type: type
                    value: user
                }
            ]
        ) {
            type
            key
            label
            selectionOption
            isDisplayedByDefault
            useNewWayToFetchOptions
            filterOptionsMapping {
                label
                value
            }
            advancedFilterInputForRetrievingOptions {
                type
                key
                value
                match_exact
            }
            tooltip(value: true)
        }
    }    
`;
