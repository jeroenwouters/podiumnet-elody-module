import {
    Collection,
    Entitytyping,
    RouteNames,
} from "../generated-types/type-defs";

export const podiumnetRoutes = [
    {
        path: "/",
        name: RouteNames.Home,
        component: "Home",
        meta: {
            requiresAuth: true,
            type: Collection.Mediafiles,
            entityType: Entitytyping.Mediafile,
            breadcrumbs: [
                {
                    overviewPage: RouteNames.Mediafiles,
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
                path: "mediafiles",
                name: RouteNames.Mediafiles,
                component: "Home",
                meta: {
                    type: Collection.Mediafiles,
                    entityType: Entitytyping.Mediafile,
                    breadcrumbs: [
                    ],
                },
            },
        ]
    },
    { path: "/home", redirect: "/" },
];
