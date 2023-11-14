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

            if (item.desc) {
                if (value !== '') {
                    let spliceStr = item.desc.split(' ').slice(1).join(' ').trim();
                    str = `${value}, ${spliceStr[0].toLowerCase()}${spliceStr.slice(1)}`;
                    style = str.length > 200 ? 'long__template' : '';
                } else {
                    str = item.desc
                }
            }
            return (
                <CSSTransition key={item.id} timeout={300} classNames='main-card'>
                    <li key={item.id} className={`main-card ${style}`} onClick={handleClick}>
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

    const renderItemsNotation = (arr) => { 
        if (arr.length === 0) {
            return (
                <Spinner 
                    width='120'
                    height='120' 
                    text="За вашим запитом нічого не знайдено"
                />
            )
        }

        const items = arr.map(item => {
            const {text, id, length} = item,
                style = length > 200 ? 'long__template' : '';

            return (
                <CSSTransition key={id} timeout={300} classNames='main-card'>
                    <li 
                        onClick={handleClick}
                        key={id} 
                        className={`notation-list main-card ${style}`}>
                        <button className='notation-list__button' onClick={() => props.filteredData(id)}>&#10060;</button>
                        <div>
                            {text}
                        </div>
                        <br/>
                        <span className={style}>{length}/200</span>
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

    const handleClick = (e) => {
        navigator.clipboard.writeText(e.currentTarget.querySelector('div').textContent);
    }
    
    const items = props.isNotation ? renderItemsNotation(data) : renderItems(data);

    return (
        <>
            {items}
        </>
    )
};

export default ModerationList;