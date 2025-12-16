// @ts-ignore
import {
  Entitytyping,
  PermissionRequestInfo,
} from "../generated-types/type-defs";

export const podiumnetPermissions: { [key: string]: PermissionRequestInfo } = {
  "create:mediafile": {
    datasource: "CollectionAPI",
    crud: "post",
    uri: `/entities`,
    body: { type: Entitytyping.Mediafile },
  },
};
