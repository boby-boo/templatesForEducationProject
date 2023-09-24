import React, { useState } from 'react';

import './templateWidgets.scss'
const TemplateWidgets = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    console.log(isOpen)
    return (
        <>
            <div className='test' onClick={handleClick}>
                <h1></h1>
            </div>
            {
                isOpen && 
            <div className="window"></div>
            }
        </>
    );
};

export default TemplateWidgets;