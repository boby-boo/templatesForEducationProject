import React from 'react';
import { useState } from "react";

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {templateModerationOfConference, templateModerationOfWebinar} from "../../templateModeration.js";
import ModerationList from "../ModerationList/ModerationList";
import SearchPanel from "../SearchPanel/SearchPanel.js";
import Spinner from "../Spinner/Spinner";

const ModerationPage = () => {
    const [cards, setCards] = useState(JSON.parse(localStorage.getItem('data_template')) || null);
    const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('selected_item')) || {value: 0, label: 'Оберіть шаблон'});

    const [searchText, setSearchText] = useState('');
    const [addUserName, setAddUserName] = useState('');

    const [isLoading, setIsLoading] = useState(cards ? false : true);

    const options = [
        {value: 1, label: 'Вебінар', isVisible: true},
        {value: 2, label: 'Конференція', isVisible: true},
    ]

    const updateData = (arr=JSON.parse(localStorage.getItem('data_template'))) => {
        setCards(arr)
        setIsLoading(false)
    }

    const updateSelectedData = (value, label) => {
        setSelected({value, label})

        let data = null;
    
        setSearchText('')
        setAddUserName('')

        switch (value) {
            case 1: 
                data = templateModerationOfWebinar;
                break;
            case 2: 
                data = templateModerationOfConference;
                break;
            default:
                data = templateModerationOfWebinar;    
                break;
        }

        localStorage.setItem('selected_item', JSON.stringify({value, label}))
        localStorage.setItem('data_template', JSON.stringify(data))
        updateData(data)
    }

    const handleFilterInput = (e) => {
        if (cards === null) return;

        const value = e.target.value;
        setSearchText(value);

        if (value === '') {
            setSearchText('')
            updateData()
            return 
        }

        const upData = filteredArray(JSON.parse(localStorage.getItem('data_template')), value);

        updateData([
            {
                title: 'Результат пошуку',
                template: upData
            }
        ])
    }

    const handleAddUserInput = (e) => {
        if (cards === null) return;
        setAddUserName(e.target.value)
    }

    const filteredArray = (arr, value) => {
        return arr
            .map(card => card.template)
            .flat(Infinity)
            .filter(template => {
                if (template.desc.toLowerCase().includes(value.toLowerCase())) {
                    const str = `${addUserName}, ${template.desc[0].toLowerCase()}${template.desc.slice(1)}`;
                    return {
                        id: template.id,
                        desc: str
                    }
                }
            })
    }

    const resetData = () => {
        setSearchText('')
        setAddUserName('')
        updateData();
    }

    const resetInputData = (value) => {
        switch (value) {
            case 'searchText':
                setSearchText('')
                updateData();
                break;
            case 'addUserName':
                setAddUserName('');
                break;
            default:
                break;
        }
    }

    const handleClick = (e) => {
        if (e.target.tagName === 'LI') {
            navigator.clipboard.writeText(e.target.childNodes[0].textContent);
            if (searchText) {
                resetData()
            }
            return;
        } 
        if (e.target.tagName === 'DIV') {
            navigator.clipboard.writeText(e.target.textContent);
            if (searchText) {
                resetData()
            }
            return;
        }
    }

    const style = cards && cards[0].title === 'Результат пошуку'? {display: 'flex', justifyContent: 'center'} : null;

    const renderList = (data) => {

        const list = data.map((item, index) => {
            return (
                <CSSTransition timeout={200} classNames='cards__row'  key={index}>
                    <ModerationList 
                        value={addUserName} 
                        key={index} 
                        title={item.title} 
                        data={item.template}
                    />
                </CSSTransition>
            )
        })

        return (
            <TransitionGroup 
                component="ul"
                className="cards__row" 
                style={style} 
                onClick={handleClick}>
                {list}
            </TransitionGroup> 
        )
    }
    
    const content = cards ? renderList(cards) : null;

    return (
        <>
            <SearchPanel 
                searchText={searchText} 
                handleFilterInput={handleFilterInput}
                resetInputData={resetInputData}
                addUserName={addUserName}
                handleAddUserInput={handleAddUserInput}
                resetData={resetData}
                selected={selected} 
                options={options} 
                updateSelectedData={updateSelectedData}
            />
            {isLoading ? <Spinner width='120' height='120' text="Оберіть шаблон для того, аби розпочати роботу"/> : content}
        </>
    );
};

export default ModerationPage;