import { gql } from "graphql-modules";

export const podiumnetSchema = gql`
    enum RouteNames {
        Mediafiles
        Users
        Assets
        Productions
        Notifications
    }

    enum Entitytyping {
        mediafile
        user
        tenant
        asset
        production
        notification
    }

    #  enum KeyValueSource {
    #
    #  }

    #  enum CreateableEntityTypes {
    #
    #  }

    enum UploadEntityTypes {
        none
    }

    # Merge with BaseFieldType from baseSchema
    enum BaseFieldType {
        hasWriterField
        assetStatusTypeField
        assetTypeTypeField
        productionStatusTypeField
        internalResponsibleTypeField
        includedAssetsTypeField
        notificationStatusTypeField
        availibilityStatusTypeField
    }

    interface Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }

    type Mediafile implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        previewComponent: PreviewComponent
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }

    type Asset implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        previewComponent: PreviewComponent
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }
    
    type Production implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        previewComponent: PreviewComponent
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }    
    
    type Notification implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        previewComponent: PreviewComponent
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }

    type User implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        previewComponent: PreviewComponent
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }

    type Tenant implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        title: [MetadataAndRelation]
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }

    #  Should be removed at some point
    type Media implements Entity {
        id: String!
        uuid: String!
        type: String!
        teaserMetadata: teaserMetadata
        intialValues: IntialValues!
        allowedViewModes: AllowedViewModes
        relationValues: JSON
        entityView: ColumnList!
        advancedFilters: AdvancedFilters
        sortOptions: SortOptions
        bulkOperationOptions: BulkOperationOptions
        previewComponent: PreviewComponent
        deleteQueryOptions: DeleteQueryOptions
        mapElement: MapElement
    }

    type Query {
        BulkOperationsRelationForm: WindowElement!
    }

    type Mutation {
        CreateEntity(entity: EntityInput!): Entity
    }
`;
