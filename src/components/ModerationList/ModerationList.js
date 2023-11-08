import React from 'react';
import Spinner from '../Spinner/Spinner';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './moderationList.scss';

const ModerationList = (props) => {
    const {title, data, value} = props;
    
    const renderItems = (arr) => { 
        if (arr.length === 0) {
            return (
                <Spinner 
                    width='120'
                    height='120' 
                    text="За вашим запитом нічого не знайдено"
                />
            )
        }

        const items = arr.map((item) => {
            let str = null,
                style = '';

            if (value !== '') {
                let spliceStr = item.desc.split(' ').slice(1).join(' ').trim();
                str = `${value}, ${spliceStr[0].toLowerCase()}${spliceStr.slice(1)}`;
                style = str.length > 200 ? 'long__template' : '';
            } else {
                str = item.desc
            }
            return (
                <CSSTransition key={item.id} timeout={300} classNames='card'>
                    <li key={item.id} className={`card ${style}`}>
                        <div>
                            {str}
                        </div>
                        <br/>
                        <span className={style}>{str.length}/200</span>
                    </li>
                </CSSTransition>
            )
        }
        )
        return (
                <li className='card__wrapper'>
                    <h2 className='cards__header'>{title}</h2>
                    <TransitionGroup component='ul' className='cards__list'>
                        {items}
                    </TransitionGroup>
                </li>
        )
    }
    
    const items = renderItems(data)

    return (
        <>
            {items}
        </>
    )
};

export default ModerationList;