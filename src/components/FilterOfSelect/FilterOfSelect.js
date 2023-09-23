import React, { useEffect, useState } from 'react';

const FilterOfSelect = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    }, [isVisible])
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
        <div className='select__row'>
            <div className='select__row_header' onClick={() => setIsVisible(!isVisible)}>
                <h3>{props.selected.label}</h3>
            </div>
                <ul className={`select__row_list${isVisible ? '_active' : ''}`}>{items}</ul>
        </div>
    );
};

export default FilterOfSelect;