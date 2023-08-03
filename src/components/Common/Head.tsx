import * as React from 'react';

interface IAppProps {
    title: string
}

const Head: React.FunctionComponent<IAppProps> = ({ title }) => {

    React.useEffect(() => {
        document.title = title;
    }, [title])

    return <aside>
        
    </aside>
}

Head.defaultProps = {
    title: 'Untitled'
}

export default Head;