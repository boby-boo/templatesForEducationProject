import React, { useState } from 'react';

const FilterOfSelect = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleCkick = (value, label) => {
        setIsVisible(false)
        props.updateSelectedData(value, label)
    }

    return (
        <div>
            <h2 onClick={() => setIsVisible(!isVisible)}>{props.selected.label}</h2>
            {isVisible 
            && 
            props.options.map(item => {
                return (
                    <li key={item.value} onClick={() => handleCkick(item.value, item.label)}>
                        {item.label}
                    </li>
                )
            })
            }
        </div>
    );
};

export default FilterOfSelect;