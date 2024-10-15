/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedSearchImport } from './routes/_authenticated/search'
import { Route as AuthenticatedPodcastsIndexImport } from './routes/_authenticated/podcasts/index'
import { Route as AuthenticatedPlaylistsIndexImport } from './routes/_authenticated/playlists/index'
import { Route as AuthenticatedArtistsIndexImport } from './routes/_authenticated/artists/index'
import { Route as AuthenticatedAlbumsIndexImport } from './routes/_authenticated/albums/index'
import { Route as AuthenticatedPodcastsPodcastIdImport } from './routes/_authenticated/podcasts/$podcastId'
import { Route as AuthenticatedPlaylistsPlaylistIdImport } from './routes/_authenticated/playlists/$playlistId'
import { Route as AuthenticatedArtistsArtistIdImport } from './routes/_authenticated/artists/$artistId'
import { Route as AuthenticatedAlbumsAlbumIdImport } from './routes/_authenticated/albums/$albumId'

// Create Virtual Routes

const AuthenticatedNowPlayingLazyImport = createFileRoute(
  '/_authenticated/now-playing',
)()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/route.lazy').then((d) => d.Route),
)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedNowPlayingLazyRoute =
  AuthenticatedNowPlayingLazyImport.update({
    path: '/now-playing',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/now-playing.lazy').then((d) => d.Route),
  )

const AuthenticatedSearchRoute = AuthenticatedSearchImport.update({
  path: '/search',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/search.lazy').then((d) => d.Route),
)

const AuthenticatedPodcastsIndexRoute = AuthenticatedPodcastsIndexImport.update(
  {
    path: '/podcasts/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any,
).lazy(() =>
  import('./routes/_authenticated/podcasts/index.lazy').then((d) => d.Route),
)

const AuthenticatedPlaylistsIndexRoute =
  AuthenticatedPlaylistsIndexImport.update({
    path: '/playlists/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/playlists/index.lazy').then((d) => d.Route),
  )

const AuthenticatedArtistsIndexRoute = AuthenticatedArtistsIndexImport.update({
  path: '/artists/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/artists/index.lazy').then((d) => d.Route),
)

const AuthenticatedAlbumsIndexRoute = AuthenticatedAlbumsIndexImport.update({
  path: '/albums/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/albums/index.lazy').then((d) => d.Route),
)

const AuthenticatedPodcastsPodcastIdRoute =
  AuthenticatedPodcastsPodcastIdImport.update({
    path: '/podcasts/$podcastId',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/podcasts/$podcastId.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedPlaylistsPlaylistIdRoute =
  AuthenticatedPlaylistsPlaylistIdImport.update({
    path: '/playlists/$playlistId',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/playlists/$playlistId.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedArtistsArtistIdRoute =
  AuthenticatedArtistsArtistIdImport.update({
    path: '/artists/$artistId',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/artists/$artistId.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedAlbumsAlbumIdRoute = AuthenticatedAlbumsAlbumIdImport.update(
  {
    path: '/albums/$albumId',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any,
).lazy(() =>
  import('./routes/_authenticated/albums/$albumId.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/search': {
      id: '/_authenticated/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof AuthenticatedSearchImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/now-playing': {
      id: '/_authenticated/now-playing'
      path: '/now-playing'
      fullPath: '/now-playing'
      preLoaderRoute: typeof AuthenticatedNowPlayingLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/albums/$albumId': {
      id: '/_authenticated/albums/$albumId'
      path: '/albums/$albumId'
      fullPath: '/albums/$albumId'
      preLoaderRoute: typeof AuthenticatedAlbumsAlbumIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/artists/$artistId': {
      id: '/_authenticated/artists/$artistId'
      path: '/artists/$artistId'
      fullPath: '/artists/$artistId'
      preLoaderRoute: typeof AuthenticatedArtistsArtistIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/playlists/$playlistId': {
      id: '/_authenticated/playlists/$playlistId'
      path: '/playlists/$playlistId'
      fullPath: '/playlists/$playlistId'
      preLoaderRoute: typeof AuthenticatedPlaylistsPlaylistIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/podcasts/$podcastId': {
      id: '/_authenticated/podcasts/$podcastId'
      path: '/podcasts/$podcastId'
      fullPath: '/podcasts/$podcastId'
      preLoaderRoute: typeof AuthenticatedPodcastsPodcastIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/albums/': {
      id: '/_authenticated/albums/'
      path: '/albums'
      fullPath: '/albums'
      preLoaderRoute: typeof AuthenticatedAlbumsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/artists/': {
      id: '/_authenticated/artists/'
      path: '/artists'
      fullPath: '/artists'
      preLoaderRoute: typeof AuthenticatedArtistsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/playlists/': {
      id: '/_authenticated/playlists/'
      path: '/playlists'
      fullPath: '/playlists'
      preLoaderRoute: typeof AuthenticatedPlaylistsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/podcasts/': {
      id: '/_authenticated/podcasts/'
      path: '/podcasts'
      fullPath: '/podcasts'
      preLoaderRoute: typeof AuthenticatedPodcastsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRoute.addChildren({
    AuthenticatedSearchRoute,
    AuthenticatedNowPlayingLazyRoute,
    AuthenticatedAlbumsAlbumIdRoute,
    AuthenticatedArtistsArtistIdRoute,
    AuthenticatedPlaylistsPlaylistIdRoute,
    AuthenticatedPodcastsPodcastIdRoute,
    AuthenticatedAlbumsIndexRoute,
    AuthenticatedArtistsIndexRoute,
    AuthenticatedPlaylistsIndexRoute,
    AuthenticatedPodcastsIndexRoute,
  }),
  LoginRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated/route.tsx",
      "children": [
        "/_authenticated/search",
        "/_authenticated/now-playing",
        "/_authenticated/albums/$albumId",
        "/_authenticated/artists/$artistId",
        "/_authenticated/playlists/$playlistId",
        "/_authenticated/podcasts/$podcastId",
        "/_authenticated/albums/",
        "/_authenticated/artists/",
        "/_authenticated/playlists/",
        "/_authenticated/podcasts/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_authenticated/search": {
      "filePath": "_authenticated/search.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/now-playing": {
      "filePath": "_authenticated/now-playing.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/albums/$albumId": {
      "filePath": "_authenticated/albums/$albumId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/artists/$artistId": {
      "filePath": "_authenticated/artists/$artistId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/playlists/$playlistId": {
      "filePath": "_authenticated/playlists/$playlistId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/podcasts/$podcastId": {
      "filePath": "_authenticated/podcasts/$podcastId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/albums/": {
      "filePath": "_authenticated/albums/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/artists/": {
      "filePath": "_authenticated/artists/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/playlists/": {
      "filePath": "_authenticated/playlists/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/podcasts/": {
      "filePath": "_authenticated/podcasts/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
