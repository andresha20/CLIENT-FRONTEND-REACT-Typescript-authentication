import * as React from 'react';

interface IAppProps {
    children: React.ReactNode
}

const ErrorWarning: React.FunctionComponent<IAppProps> = ({ children }) => {

    return <p className='bg-red-900 text-white p-2 rounded border-red-900 bg-opacity-90'>{children}</p>
}

export default ErrorWarning;