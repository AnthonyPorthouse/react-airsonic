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
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/search': {
      preLoaderRoute: typeof AuthenticatedSearchImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/now-playing': {
      preLoaderRoute: typeof AuthenticatedNowPlayingLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/albums/$albumId': {
      preLoaderRoute: typeof AuthenticatedAlbumsAlbumIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/artists/$artistId': {
      preLoaderRoute: typeof AuthenticatedArtistsArtistIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/playlists/$playlistId': {
      preLoaderRoute: typeof AuthenticatedPlaylistsPlaylistIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/podcasts/$podcastId': {
      preLoaderRoute: typeof AuthenticatedPodcastsPodcastIdImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/albums/': {
      preLoaderRoute: typeof AuthenticatedAlbumsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/artists/': {
      preLoaderRoute: typeof AuthenticatedArtistsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/playlists/': {
      preLoaderRoute: typeof AuthenticatedPlaylistsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/podcasts/': {
      preLoaderRoute: typeof AuthenticatedPodcastsIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthenticatedRouteRoute.addChildren([
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
  ]),
  LoginRoute,
])
