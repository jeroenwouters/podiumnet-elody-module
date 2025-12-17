import { resolveId, resolveRelations, simpleReturn } from "base-graphql";
import {
  BaseEntity,
  Metadata,
  Resolvers,
  WindowElement,
  RelationFieldInput,
} from "../generated-types/type-defs";

const baseSetOffResolvers = {
  id: resolveId,
  uuid: resolveId,
  intialValues: simpleReturn,
  allowedViewModes: simpleReturn,
  relationValues: resolveRelations,
  entityView: simpleReturn,
  teaserMetadata: simpleReturn,
  deleteQueryOptions: simpleReturn,
  mapElement: simpleReturn,
};

export const podiumnetResolver: Resolvers = {
  Entity: {
    __resolveType(obj) {
      const type = obj.type?.toLowerCase();
      if (type === "user") return "User";
      else if (type === "tenant") return "Tenant";
      else if (type === "mediafile") return "MediaFileEntity";
      else if (type === "asset") return "Asset";
      return "BaseEntity";
    },
  },
  User: {
    ...baseSetOffResolvers,
  },
  Tenant: {
    ...baseSetOffResolvers,
  },
  Mediafile: {
    ...baseSetOffResolvers,
  },
  Asset: {
    ...baseSetOffResolvers,
  },
  Query: {
    BulkOperationsRelationForm: async (
      _source: any,
      _args,
      { dataSources },
    ) => {
      return {} as WindowElement;
    },
  },
  Mutation: {
    CreateEntity: async (_source, { entity }, { dataSources }) => {
      const createdEntity = await dataSources.CollectionAPI.createEntity(
        entity,
        (entity.metadata as Metadata[]) || [],
        (entity.relations as RelationFieldInput[]) || [],
      );
      return createdEntity as BaseEntity;
    },
  },
};
