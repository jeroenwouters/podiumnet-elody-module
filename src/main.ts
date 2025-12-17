import {
    podiumnetModule,
    podiumnetAppConfig,
    podiumnetTranslations,
    podiumnetFields,
    podiumnetTypeCollectionMapping,
    podiumnetTypePillLabelMapping,
} from "./podiumnetModule";
import start, {type ElodyModuleConfig} from "base-graphql";
import {mediafileModule} from "mediafile-module";
import {savedSearchModule} from "saved-search-module";
import {podiumnetPermissions} from "./podiumnetPermissions";
import {podiumnetFormattersConfig} from "./podiumnetFormattersConfig";

const podiumnetElodyConfig: ElodyModuleConfig = {
    modules: [
        mediafileModule,
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
    podiumnetTypeCollectionMapping,
    podiumnetPermissions,
    podiumnetFormattersConfig,
    undefined,
    podiumnetTypePillLabelMapping,
);
