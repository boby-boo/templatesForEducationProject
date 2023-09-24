import React from 'react';

import './inputSearch.scss';

const InputSearch = ({value, text, resetInputData, handleFunction, name, icon}) => {
    const isActive = value ? 'input__active' : null

    return (
        <div className='input__wrapper'>
            <>
            <input
                className={`panel__input input__${icon} ${isActive}`}
                type="text" 
                name={name} 
                value={value} 
                onChange={handleFunction} 
                placeholder={text} 
            />
            {value && <button className='panel__input_button button' onClick={() => resetInputData(name)}></button>}
            </>
        </div> 
    );
};

export default InputSearch;