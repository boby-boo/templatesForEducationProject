import React from 'react';

const InputPanel = (props) => {
    const {value, handleFunction, text} = props
    return (
        <div style={{background: 'yellow'}}>
            <input type="text" value={value} onChange={handleFunction} placeholder={text}/>
        </div>
    );
};

export default InputPanel;