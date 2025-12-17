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
    
`;
