import * as React from 'react';
import Head from '../Common/Head';
import { useSession } from '../../providers/Auth';

interface IAppProps {
    children: React.ReactNode,
    pageTitle: string
}

const Layout: React.FunctionComponent<IAppProps> = ({ pageTitle, children }) => {

    const { darkTheme, setDarkTheme } = useSession();
    const switchTheme = React.useCallback(() => {
        document.documentElement.setAttribute("class", darkTheme ? 'dark' : '');
    }, [darkTheme])
  
    React.useEffect(() => {
      switchTheme();
      return () => {}
    }, [darkTheme, switchTheme])

    return <section className='relative dark:bg-gray-700 bg-gray-200 min-h-screen p-10'>
        <Head title={pageTitle}/>
        <section title="Switch theme" onClick={() => setDarkTheme(state => !state)} className="rounded-tl shadow rounded-bl text-center p-3 fixed right-0 top-1/2 transform -translate-y-1/2 bg-slate-100 text-black hover:text-yellow-500 dark:hover:text-yellow-500 cursor-pointer transition-all dark:text-white dark:bg-slate-900">
            {darkTheme
                ?
                <i className="bi bi-brightness-high-fill"></i>
                :
                <i className="bi bi-moon-stars"></i>
            }
        </section>
        {children}
    </section>
}

export default Layout;