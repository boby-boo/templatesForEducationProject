import React from 'react';

const ModerationList = (props) => {
    const {title, data, value} = props;

    const renderItems = (arr) => {  
        const items = data.map((item) => {
            let str = null;
            if (value !== '') {
                let spliceStr = item.desc.split(' ').slice(1).join(' ').trim();
                str = `${value}, ${spliceStr[0].toLowerCase()}${spliceStr.slice(1)}`;
            } else {
                str = item.desc;
            }
            return (
                <li key={item.id}
                className='card'>
                    <div>
                        {str}
                    </div>
                <br/>
                <span>{item.desc.length}/200</span>
                </li>
            )
        }
        )

        return (
            <>
            <ul className='cards__list'>
                <h2>{title}</h2>
                {items}
            </ul>
            </>
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