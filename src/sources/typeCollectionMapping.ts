import { Collection, Entitytyping } from "../../generated-types/type-defs";

export const podiumnetTypeCollectionMapping: {
  [test: string]: Collection;
} = {
  [Entitytyping.Mediafile]: Collection.Mediafiles,
  [Entitytyping.Asset]: Collection.Entities,
};
