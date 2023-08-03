import * as React from 'react'
import fetcher from '../utils/fetch';
import useSWR from 'swr'
import { deleteCookie, getCookie, setCookie } from '../utils/cookies';

interface IAppProps {
    children: React.ReactNode
}

interface Context {
    session?: { username: string, email: string, id: number },
    darkTheme?: boolean,
    setDarkTheme?: React.Dispatch<React.SetStateAction<boolean>>,
    setSession?: React.Dispatch<React.SetStateAction<undefined>>,
    loading?: boolean,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    signup?: (arg0: object) => void,
    login?: (arg0: object) => void,
    sessionLoading?: boolean,
    logout?: (arg0: number, arg1: () => void) => void
}

export const AuthTokenContext = React.createContext<Context>({});

export const AuthTokenProvider: React.FunctionComponent<IAppProps> = ({ children }) => {

    const auth = {
        authLogin: 'auth/Auth/login',
        authSignup: 'auth/Auth/signup',
        authLogout: 'User',
    }
 
    let token = getCookie('jwt');
    const [unfetchedSession, setUnfetchedSession] = React.useState(true);
    const { data, error, mutate, isValidating } = useSWR(((unfetchedSession && token) && `User/validatesession`), (url: string) => fetcher(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token && JSON.parse(token)}`,
        },
    }), { dedupingInterval: 900000, revalidateOnFocus: false });
    const sessionLoading = !data && !error && isValidating;
    const cachedSession = data;
    console.log(cachedSession)
    const [session, setSession] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [darkTheme, setDarkTheme] = React.useState(false);

    const signup = async (userData: object) => {
        try {
            setLoading(true);
            const response = await fetcher(auth.authSignup, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userData })
            })
            if (response) {
                ({ token } = response);
                setCookie('jwt', JSON.stringify(token));
            }
            setUnfetchedSession(true);
            mutate();
        } catch (error) {
            console.log(error);
        }
        return setLoading(false);
    }

    const login = async (userData: object) => {
        try {
            setLoading(true);
            const response = await fetcher(auth.authLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userData })
            })
            console.log(response)
            if (response) {
                ({ token } = response);
                setCookie('jwt', JSON.stringify(token));
            }
            setUnfetchedSession(true);
            mutate();
        } catch (error) {
            console.log(error);
        }
        return setLoading(false);
    }

    const logout = async (id: number, callback: () => void) => {
        try {
            setLoading(true);
            const response = await fetcher(`${auth.authLogout}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token && JSON.parse(token)}`,
                },
            })
            console.log(response);
            deleteCookie('jwt');
            setUnfetchedSession(true);
            mutate();
            callback();
        } catch (error) {
            console.log(error);
        }
        return setLoading(false);
    }

    const values: Context = { darkTheme, setDarkTheme, session, setSession, signup, login, logout, loading, sessionLoading } 
    
    React.useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (sessionLoading || !cachedSession) return;
            if (cachedSession.username) {
                setSession(cachedSession)
                setUnfetchedSession(false);
            } 
        }
        return () => {
            mounted = false;
        }
    }, [cachedSession, sessionLoading])

    return <AuthTokenContext.Provider value={values}>
        {children}
    </AuthTokenContext.Provider>
}

export const useSession = () => React.useContext(AuthTokenContext);