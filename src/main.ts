import { mediafileModule } from "mediafile-module";
import { advancedFilterModule } from "advanced-filter-module";
import { savedSearchModule } from "saved-search-module";
import {
  podiumnetModule,
  podiumnetAppConfig,
  podiumnetTranslations,
  podiumnetFields,
  podiumnetElodyTypeCollectionMapping,
  podiumnetTypePillLabelMapping,
} from "./podiumnetModule";
import start, { type ElodyModuleConfig } from "base-graphql";
import { podiumnetPermissions } from "./podiumnetPermissions";

const podiumnetElodyConfig: ElodyModuleConfig = {
  modules: [
    mediafileModule,
    advancedFilterModule,
    savedSearchModule,
    podiumnetModule,
  ],
  dataSources: {},
};

start(
  podiumnetElodyConfig,
  podiumnetAppConfig,
  podiumnetTranslations,
  [],
  podiumnetFields,
  podiumnetElodyTypeCollectionMapping,
  podiumnetPermissions,
  undefined,
  undefined,
  podiumnetTypePillLabelMapping,
);
