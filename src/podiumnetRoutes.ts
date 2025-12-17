import {
    Collection,
    Entitytyping,
    RouteNames,
} from "../generated-types/type-defs";

export const podiumnetRoutes = [
    {
        path: "/assets",
        name: RouteNames.Home,
        component: "HomeWrapper",
        meta: {
            requiresAuth: false,
            type: Collection.Entities,
            entityType: Entitytyping.Asset,
            hasEditMetadataButton: false,
            slug: "assets",
            breadcrumbs: [
                {
                    overviewPage: RouteNames.Assets,
                    title: "navigation.assets",
                },
            ],
        },
        children: [
            {
                path: ":type/:id",
                name: RouteNames.SingleEntity,
                component: "SingleEntity",
                meta: {},
            },
            {
                path: "/assets",
                name: RouteNames.Assets,
                component: "Home",
                meta: {
                    requiresAuth: false,
                    type: Collection.Entities,
                    entityType: Entitytyping.Asset,
                    hasEditMetadataButton: false,
                    slug: "assets",
                    breadcrumbs: [
                        {
                            overviewPage: RouteNames.Assets,
                            title: "navigation.assets",
                        },
                    ],
                },
            },
            {
                path: "/mediafiles",
                name: RouteNames.Mediafiles,
                component: "Home",
                meta: {
                    type: Collection.Entities,
                    entityType: Entitytyping.Mediafile,
                    hasEditMetadataButton: false,
                    slug: "mediafiles",
                    breadcrumbs: [
                        {
                            relation: `relationValues.isMediafileFor.key`,
                            key: [`elody:1|identifiers`],
                            entityType: Entitytyping.Asset,
                        },
                        {
                            overviewPage: RouteNames.Mediafiles,
                            title: "navigation.mediafiles",
                        },
                    ],
                },
            },
        ]
    },
    {path: "/asset", redirect: "/assets"},
    {path: "/home", redirect: "/assets"},
    {path: "/", redirect: "/assets"},
];
