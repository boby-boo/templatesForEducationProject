import React from 'react';

const InputPanel = ({value, text, resetInputData, handleFunction, name}) => {
    return (
        <div style={{background: 'yellow', display: 'flex'}}>
            <input type="text" name={name} value={value} onChange={handleFunction} placeholder={text} />
            {value && <button onClick={() => resetInputData(name)}>❌</button>}
        </div>
    );
};

export default InputPanel;