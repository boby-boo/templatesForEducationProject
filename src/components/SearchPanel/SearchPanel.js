import React from 'react';
import InputSearch from "../InputSearch/InputSearch.js";

const SearchPanel = (props) => {
    const {searchText, addUserName, handleFilterInput, resetInputData, handleAddUserInput, resetData} = props;

    return (
        <section className="search__panel">
            <InputSearch
                icon='search'
                text="Пошук за ключовими словами"
                type="text"
                name='searchText'
                value={searchText}
                handleFunction={handleFilterInput}
                resetInputData={resetInputData}
            />
            <InputSearch
                icon='user'
                text="Додати ім'я користувача"
                type="text"
                name='addUserName'
                value={addUserName}
                resetInputData={resetInputData}
                handleFunction={handleAddUserInput}
            />
            <button onClick={resetData} className='search__panel_button button'>
                Видалити все
            </button>
        </section>
    );
};

export default SearchPanel;