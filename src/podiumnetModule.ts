import { createModule } from "graphql-modules";
import { podiumnetResolver } from "./podiumnetResolver";
import { podiumnetSchema } from "./podiumnetSchema.schema";
import { podiumnetQueries } from "./queries/podiumnet.queries";
import { podiumnetAppConfig } from "./podiumnetAppConfig";
import { podiumnetFields } from "./sources/forms";
import { loadTranslationsFromDirectory } from "base-graphql";
import path from "path";
import { podiumnetElodyTypeCollectionMapping } from "./sources/typeCollectionMapping";
import { podiumnetTypePillLabelMapping } from "./sources/typePillLabelMapping";

const podiumnetTranslations: Record<string, Object> =
  loadTranslationsFromDirectory(path.join(__dirname, "translations"));

const podiumnetModule = createModule({
  id: "podiumnetModule",
  dirname: __dirname,
  typeDefs: [podiumnetSchema],
  resolvers: [podiumnetResolver],
});

export {
  podiumnetQueries,
  podiumnetModule,
  podiumnetAppConfig,
  podiumnetTranslations,
  podiumnetFields,
  podiumnetElodyTypeCollectionMapping,
  podiumnetTypePillLabelMapping,
};
