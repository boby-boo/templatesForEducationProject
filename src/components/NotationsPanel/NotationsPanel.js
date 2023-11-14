import ModerationList from '../ModerationList/ModerationList';

import './notationsPanel.scss';
import { useDispatch, useSelector } from 'react-redux';
import { filteredState } from '../redux/actions';
import { useState } from 'react';

const NotationsPanel = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notationsData = useSelector(state => state.notations);

    const dispatch = useDispatch();

    const filteredData = (id) => {
        dispatch(filteredState(id))
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

    return (
        <>
            {notationsData.length !== 0 &&
                <button 
                    className='notations__button'
                    onClick={showModal}
                    >
                    button
                </button>
            }
            {isVisible && 
                <>
                    <div className="notations-panel">
                    <button
                        onClick={showModal} 
                        className='notations__button_panel'>
                        button
                    </button>
                            <div className="notations-panel__row visible-panel">
                                {content}
                            </div>
                    </div>
                    <div onClick={() => setIsVisible(false)} className="overlay__light"></div>
                </>
            }

        </>
    );
};

export default NotationsPanel;