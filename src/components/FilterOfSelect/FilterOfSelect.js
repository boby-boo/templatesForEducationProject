import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './filterOfSelect.scss';

const FilterOfSelect = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = (value, label) => {
        setIsVisible(false)
        props.updateSelectedData(value, label)
    }

    const items = props.options.map(item => {
        return (
            <li key={item.value} onClick={() => handleClick(item.value, item.label)}>
                {item.label}
            </li>
        )
    })

    return (
        <>
            <div className='select__row'>
                <div className='select__row_header' onClick={() => setIsVisible(!isVisible)}>
                    <h3>{props.selected.label}</h3>
                </div>
                    <CSSTransition 
                        in={isVisible}  
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                        classNames="select__row_list">
                            <ul className="select__row_list">{items}</ul> 
                    </CSSTransition>
            </div>
            {isVisible && <div onClick={() => setIsVisible(!isVisible)} className="select__row_window"></div>}
        </>
    );
};

export default FilterOfSelect;