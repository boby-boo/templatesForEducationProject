import ModerationList from "../ModerationList/ModerationList";
import { useEffect, useState } from "react";
import SearchPanel from "../SearchPanel/SearchPanel.js";

import {templateModerationOfConference, templateModerationOfWebinar} from "../../templateModeration.js";

import { FidgetSpinner, ProgressBar } from "react-loader-spinner";

function App() {
    const [cards, setCards] = useState(JSON.parse(localStorage.getItem('data')) || null);
    const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('selectedItem')) || {value: 0, label: 'Оберіть шаблон'});
    
    const [searchText, setSearchText] = useState('');
    const [addUserName, setAddUserName] = useState('');
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [idArr, setIdArr] = useState([]);

    console.log(cards)
    const options = [
        {value: 1, label: 'Вебінар', isVisible: true},
        {value: 2, label: 'Конференція', isVisible: true},
    ]

    useEffect(() => {
        renderItems(cards, addUserName)
    }, [addUserName])


    const updateData = (arr=templateModerationOfWebinar) => {
        setCards(arr)
    }

    const updateSelectedData = (value, label) => {
        setSelected({value, label})
        let data = null;
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

        localStorage.setItem('selectedItem', JSON.stringify({value, label}))
        localStorage.setItem('data', JSON.stringify(data))
        updateData(data)
    }

    const handleFilterInput = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value === '') {
            setSearchText('')
            updateData()
            return 
        }

        const upData = filteredArray(cards, value);

        updateData([
            {
                title: 'Результат пошуку',
                template: upData
            }
        ])
    }

    const handleAddUserInput = (e) => {
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
        updateData()
    }

    const resetInputData = (value) => {
        if (value === 'searchText') {
            setSearchText('')
            updateData()
        } 
        if (value === 'addUserName') {
            setAddUserName('')
        } 
    }

    const renderItems = (data, value) => {
        return data.map((item, index) => <ModerationList value={value} key={index} title={item.title} data={item.template}/>)
    };

    const handleClick = (e) => {
        if (e.target.tagName === 'LI') {
            navigator.clipboard.writeText(e.target.childNodes[0].textContent);
            return;
        } 
        if (e.target.tagName === 'DIV') {
            console.log('DIV')
            navigator.clipboard.writeText(e.target.textContent);
            return;
        }
    }
    
    if (cards === null) {
        console.log(cards === null)
        return (
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#F4442E'
                barColor = '#51E5FF'
/>
        )
    }
    
    const items = renderItems(cards, addUserName);
    let style = {};

    if (items[0].props.title === 'Результат пошуку') {
        console.log('Результат пошуку')
        style = {display: 'flex', justifyContent: 'center'}
    }

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

            <div className="cards__row" style={style} onClick={handleClick}>{items}</div>
        </>
    );
}

export default App;