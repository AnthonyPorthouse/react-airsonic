import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import AlbumList from '../../../Components/AlbumList';
import { useAuth } from '../../../Providers/AuthProvider';
import { ArtistQueryOptions } from './$artistId';

export const Route = createLazyFileRoute('/_authenticated/artists/$artistId')({
    component: Artist
})

function Artist() {
    const { artistId } = Route.useParams();
    const auth = useAuth();

    const {
        data: [artist, albums],
    } = useSuspenseQuery({
        ...ArtistQueryOptions(artistId, auth),
        initialData: Route.useLoaderData(),
    });

    return (
        <div>
            <h1 className={`text-2xl`}>{artist.name}</h1>

            <AlbumList albums={albums} />
        </div>
    );
}
