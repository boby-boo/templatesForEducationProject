import React from 'react';
import InputSearch from "../InputSearch/InputSearch.js";
import FilterOfSelect from '../FilterOfSelect/FilterOfSelect.js';
import Notations from '../Notations/Notations.js';

import './searchPanel.scss';

const SearchPanel = (props) => {
    const {searchText, addUserName, handleFilterInput, resetInputData, handleAddUserInput, resetData, selected, options, updateSelectedData} = props;

    return (
        <header className="search__panel">
            <div className='search__panel_wrapper'>
                <Notations />
                <FilterOfSelect selected={selected} options={options} updateSelectedData={updateSelectedData}/>
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
            </div>
        </header>
    );
};

export default SearchPanel;