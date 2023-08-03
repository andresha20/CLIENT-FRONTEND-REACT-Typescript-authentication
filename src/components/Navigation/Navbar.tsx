import * as React from 'react';
import { useSession } from '../../providers/Auth';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FunctionComponent = () => {

    const { session, sessionLoading } = useSession();
    const navigate = useNavigate();

    return <aside>
        <header className="bg-gray-100 dark:bg-gray-900 text-center py-1 text-gray-800 dark:text-white text-sm">
            <h1 className="text-xs">Financial Simulator - Anamerica provides financial aid in America since 1985</h1>
        </header>
        <nav className="bg-white dark:bg-gray-800 md:px-10 px-3 flex items-center justify-between">
            <p onClick={() => navigate('/')} className="select-none cursor-pointer font-extrabold text-2xl text-gray-800 dark:text-white">Aname<span className="text-yellow-500">rica</span></p>
            {!sessionLoading && 
                <div>
                    {session
                        ?
                        <p className='bg-yellow-500 bg-opacity-10 rounded-full font-bold text-yellow-500 p-2'>{session.username}</p>
                        :
                        <button onClick={() => navigate('/signin')} className='border-none bg-yellow-500 text-white hover:bg-gray-900 transition-all cursor-pointer rounded p-3 font-bold'>Login</button>
                    }
                </div>
            }
        </nav>
    </aside>
}

export default Navbar;