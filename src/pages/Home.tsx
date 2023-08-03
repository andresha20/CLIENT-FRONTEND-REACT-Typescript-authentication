import * as React from 'react'
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSession } from "../providers/Auth";

const Home = () => {

    const navigate = useNavigate();
    const { session, sessionLoading } = useSession();

    React.useEffect(() => {
        if (sessionLoading) return;
        if (session) {
            navigate('/dashboard');
            return;
        }
        return () => {};
    }, [session, sessionLoading, navigate])

    return <>
        <Layout pageTitle='Home'>
            <section className="bg-white dark:bg-gray-800 dark:text-white p-10 rounded shadow max-w-sm mx-auto">
                <h2>Welcome to Anamerica</h2>
                <p>This is a demo website to showcase authentication and user-persistance using ASP.NET and React with Typescript.</p>
                <button onClick={() => navigate('/signin')} className='border-none bg-yellow-500 text-white hover:bg-gray-900 transition-all cursor-pointer rounded p-3 font-bold'>Login</button>
            </section>
        </Layout>
    </>
}

export default Home;