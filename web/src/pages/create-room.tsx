import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type getRoomsAPIResponse = Array<{
    id: string;
    name: string;
}>;

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const repsonse = await fetch('http://localhost:3333/rooms');
            const result: getRoomsAPIResponse = await repsonse.json();
            return result;
        },
    });

    return (
        <div>
            <div>Create Room</div>

            {isLoading && <p>Carregando...</p>}
            <div className='flex flex-col'>
                {data?.map((room) => {
                    return <Link key={room.id} to={`/room/${room.id}`}>{room.name}</Link>;
                })}
            </div>

            <Link className="underline" to={'/room'}>
                Acessar sala
            </Link>
        </div>
    );
}
