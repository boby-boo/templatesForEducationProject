import React from 'react';

import './notations.scss';

const Notations = () => {
    return (
        <>
            <button className='notation__button button'></button>
            <form className="notation__window">
                <input type="text" placeholder='Введіть текст'/>
                <button>Зберегти</button>
            </form>
            <div className="notation__rectangle"></div>
        </>
    );
};

export default Notations;