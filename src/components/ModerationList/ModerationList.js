import React from 'react';
import './moderationList.css'

const emojiArray = "📚,  🔔,  🧩, ⏰, 💡, 🔧, ⚙️, 📩, 📪, 🗓, 📍, 📌, 🔍, ❗️, ⬇️, 📢, 📑, 📨, 📃, 📣, ':yt:', ':buffering:'";

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
            // const str = value ? `${value}, ${item.desc[0].toLowerCase() + item.desc.slice(1)}` : item.desc;
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