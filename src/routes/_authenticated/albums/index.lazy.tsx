import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlbumsQueryOptions } from '.';
import AlbumList from '../../../Components/AlbumList';
import Spinner from '../../../Components/Spinner';
import { useAuth } from '../../../Providers/AuthProvider';

export const Route = createLazyFileRoute('/_authenticated/albums/')({
  component: Albums,
  pendingComponent: Spinner
})

function Albums() {
  const auth = useAuth();
  const { t } = useTranslation("albums");

  const { data } = useSuspenseQuery({
    ...AlbumsQueryOptions(auth),
    initialData: Route.useLoaderData(),
  });

  const albums = useMemo(
    () => [...data].sort((a, b) => a.name.localeCompare(b.name)),
    [data],
  );

  return (
    <div>
      <h1 className={`text-2xl`}>{t("allAlbums")}</h1>

      <AlbumList albums={albums} />
    </div>
  );
}
