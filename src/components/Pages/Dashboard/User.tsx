import * as React from 'react';
import { useSession } from '../../../providers/Auth';
import { useNavigate } from 'react-router-dom';

interface IAppProps {

}

const User: React.FunctionComponent<IAppProps> = () => {

    const navigate = useNavigate();
    const { session, sessionLoading } = useSession();

    const login = async (userData: object) => {
        try {
            setLoading(true);
            const response = await fetcher(`/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { ...userData }
            })
            console.log(response);
            mutate();
        } catch (error) {
            console.log(error);
        }
        return setLoading(false);
    }

    if (!sessionLoading && !session) return <section>
        <h2>Log into an account to access this functionality.</h2>
        <button onClick={() => navigate('/signin')} className='bg-yellow-600 p-3 rounded font-bold text-white hover:bg-gray-900 transition-all'>Signin</button>
    </section>

    return <section className='max-w-screen-md'>
        <h2>{session?.Name || ''}</h2>
    </section>
}

export default User;