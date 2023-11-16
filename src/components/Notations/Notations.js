import React from 'react';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {updateState} from '../redux/actions';

import './notations.scss';

const Notations = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
        setText('')
    }

    const changeTextareaValue = (e) => {
        setText(e.target.value)
    }

    const updateNotation = (e) => {
        e.preventDefault();
        
        if (text.length === 0) return;

        const notation = {
            id: uuid4(),
            length: text.length,
            text
        }
        dispatch(updateState(notation));
        setText('');
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={openModal} className='notation__button button'>
            </button>
                <ModalNotation
                    text={text}
                    isOpen={isOpen}
                    updateNotation={updateNotation}
                    changeTextareaValue={changeTextareaValue}
                    closeModal={closeModal}
                />
        </>
    );
};

const ModalNotation = (props) => {
    const {updateNotation, changeTextareaValue, closeModal, text, isOpen} = props;

    let style = text.length > 200 ? 'long__template' : ''; 

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateNotation(e);
        }
    }

    return (
        <>
        {isOpen && 
            <>
                <form
                    className="notation__modal"
                    onSubmit={updateNotation}
                    onKeyPress={handleKeyPress}
                >
                    <h2>Введіть текст, який необхідно зберігти</h2>
                    <textarea value={text} 
                        type="text"
                        placeholder='Введіть текст' 
                        autoFocus
                        required
                        onChange={changeTextareaValue}
                    />
                    <div className={`notation__text_length ${style}`}>{text.length}/200</div>
                    <button className='button'>Зберегти</button>
                </form>
                <div onClick={closeModal} className="overlay"></div>   
            </>
        }  
    </>
    )
} 

export default Notations;