import { Collection, Entitytyping } from "../../generated-types/type-defs";

export const podiumnetTypeCollectionMapping: {
  [test: string]: Collection;
} = {
  [Entitytyping.Asset]: Collection.Entities,
  [Entitytyping.Production]: Collection.Entities,
  [Entitytyping.Mediafile]: Collection.Mediafiles,
};
