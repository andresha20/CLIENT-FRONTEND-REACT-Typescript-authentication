import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSession } from "../providers/Auth";

const Dashboard = () => {

    const navigate = useNavigate();
    const { session, sessionLoading, logout } = useSession();

    React.useEffect(() => {
        if (sessionLoading) return;
        if (!session) {
            navigate('/');
            return;
        }
        return () => {};
    }, [session, sessionLoading, navigate])

    if (sessionLoading) return <></>

    return <Layout pageTitle='Dashboard'>
            <section className="bg-white dark:bg-gray-800 dark:text-white p-10 rounded shadow max-w-sm mx-auto">
                <h2>Welcome back, <span className="text-yellow-500">{session?.username}</span></h2>
                <p>Your email is: <b>{session?.email}</b></p>
                <button onClick={() => logout && session && logout(session.id, () => location.reload())} className='border-none bg-red-900 text-white hover:bg-gray-900 transition-all cursor-pointer rounded p-3 font-bold'>Logout</button>
            </section>
    </Layout>
}

export default Dashboard;