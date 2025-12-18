import {
    Collection,
    Entitytyping,
    RouteNames,
} from "../generated-types/type-defs";

export const podiumnetRoutes = [
    {
        path: "/",
        name: RouteNames.Home,
        component: "HomeWrapper",
        meta: {
            requiresAuth: false,
            type: Collection.Entities,
            entityType: Entitytyping.Production,
            hasEditMetadataButton: false,
            breadcrumbs: [
                {
                    overviewPage: RouteNames.Productions,
                    title: "navigation.productions",
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
                path: "/productions",
                name: RouteNames.Productions,
                component: "Home",
                meta: {
                    requiresAuth: false,
                    type: Collection.Entities,
                    entityType: Entitytyping.Production,
                    breadcrumbs: [
                        {
                            overviewPage: RouteNames.Productions,
                            title: "navigation.productions",
                        },
                    ],
                },
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
                    breadcrumbs: [
                        {
                            key: ["elody:1|relations.hasAsset.key"],
                            entityType: Entitytyping.Production,
                        },
                        {
                            overviewPage: RouteNames.Assets,
                            title: "navigation.assets",
                        },
                    ],
                },
            },
            {
                path: "/notifications",
                name: RouteNames.Notifications,
                component: "Home",
                meta: {
                    requiresAuth: false,
                    type: Collection.Entities,
                    entityType: Entitytyping.Notification,
                    breadcrumbs: [
                        {
                            key: ["elody:1|relations.hasNotification.key"],
                            entityType: Entitytyping.Production,
                        },
                        {
                            overviewPage: RouteNames.Notifications,
                            title: "navigation.notifications",
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
                    breadcrumbs: [
                        {
                            key: ["elody:1|relations.hasMediafile.key"],
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
    {path: "/production", redirect: "/productions"},
    {path: "/home", redirect: "/productions"},
    {path: "/", redirect: "/productions"},
];
