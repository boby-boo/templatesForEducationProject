import templateModeration from "../../templateModeration.js";
import ModerationList from "../ModerationList/ModerationList";
import { useEffect, useState } from "react";
import SearchPanel from "../SearchPanel/SearchPanel.js";


function App() {
    const [cards, setCards] = useState(templateModeration);
    const [searchText, setSearchText] = useState('');
    const [addUserName, setAddUserName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [idArr, setIdArr] = useState([]);

    useEffect(() => {
        renderItems(templateModeration, addUserName)
    }, [addUserName])

    const updateData = (arr=templateModeration) => {
        setCards(arr)
    }

    const handleFilterInput = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value === '') {
            setSearchText('')
            updateData()
            return 
        }

        const upData = filteredArray(templateModeration, value);

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
    
    const items = renderItems(cards, addUserName);

    return (
        <>
        <SearchPanel 
            searchText={searchText} 
            handleFilterInput={handleFilterInput}
            resetInputData={resetInputData}
            addUserName={addUserName}
            handleAddUserInput={handleAddUserInput}
            resetData={resetData}
        />
        <div className="cards__row" onClick={handleClick}>{items}</div>
        </>
    );
}

export default App;