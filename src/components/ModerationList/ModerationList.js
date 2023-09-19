import React from 'react';
import './moderationList.css'

const ModerationList = (props) => {
    const {title, data} = props;

    const handleClick = (e) => {
        const element = e.target.closest('li');
        navigator.clipboard.writeText(element.innerText);
    }

    const renderItems = (arr) => {
        const items = arr.map((text, index) => (
            <li key={index}
                className='card'
                onClick={handleClick}>
                {text}
                <br/>
                <span>200/{text.length}</span>
            </li>)
        )

        return (
            <ul className='cards__row'>
                <h2>{title}</h2>
                {items}
            </ul>
        )
    }
    const items = renderItems(data)

    return (
        <>  
            {items}
        </>
    );
};

export default ModerationList;