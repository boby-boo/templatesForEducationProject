import { useEffect, useState } from 'react';
import './notationSpanel.scss';
import ModerationList from '../ModerationList/ModerationList';

const NotationsPanel = () => {
    const [notations, setNotations] = useState(null);
    
    useEffect(() => {
        setNotations(getLocalStorage())
    }, [])

    const filteredData = (id) => {
        const data = notations.filter(item => item.id !== id);

        setNotations(data);
        localStorage.setItem('notations', JSON.stringify(data));
    }

    const getLocalStorage = () => {
        return JSON.parse(localStorage.getItem('notations')) || []
    }

    const renderItems = () => {
        return (
            <>
                <ModerationList 
                    title='Збережені нотатки' 
                    data={notations} 
                    value=''
                    filteredData={filteredData}
                    isNotation='true'
                />
            </>

        )
    }

    if (!notations || notations.length === 0 ) {
        return (
            <>
                <h1>kd</h1>
            </>
        )
    }

    const content = renderItems(notations);

    return (
        <>
            <div className="notations-panel">
            {/* <button onClick={() => setIsVisible(!isVisible)}className='notations-panel__button'>
                button
            </button> */}
                <ul className="notations-panel__row">
                    {content}
                </ul>
            </div>
            {/* <div onClick={() => setIsVisible(false)}className="overlay__light"></div> */}

        </>
    );
};

export default NotationsPanel;