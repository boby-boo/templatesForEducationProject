import ModerationList from '../ModerationList/ModerationList';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { filteredState } from '../redux/actions';

import './notationsPanel.scss';

const NotationsPanel = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notationsData = useSelector(state => state.notations);

    const dispatch = useDispatch();

    const filteredData = (id) => {
        dispatch(filteredState(id));
        if (notationsData.length === 1) setIsVisible(false);
    };

    const showModal = () => {
        setIsVisible(!isVisible)
    }

    const renderItems = (notations) => {
        return (
            <>
                <ModerationList 
                    title='Збережені нотатки' 
                    data={notations} 
                    value=''
                    showModal={showModal}
                    filteredData={filteredData}
                    isNotation='true'
                />
            </>
        )
    }

    if (!notationsData || notationsData.length === 0) {
        return (
            <></>
        )
    }

    const content = renderItems(notationsData);

    const panelPosition = {left: isVisible ? '0' : '-350px'};
    const buttonPosition = {left: isVisible ? '340px' : '350px'};

    return (
        <>
            <div className="notations-panel" style={panelPosition}>
                <button
                    style={buttonPosition}
                    onClick={showModal} 
                    className='notations-panel__button'>
                        {notationsData.length}
                </button>
                <div className="notations-panel__row visible-panel">
                    {content}
                </div>
            </div>
            {isVisible &&
                <div 
                    onClick={() => setIsVisible(false)} 
                    className="overlay">
                </div>
            }
        </>
    );
};

export default NotationsPanel;