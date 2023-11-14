import { useState } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid4 } from 'uuid';

import './notations.scss';

const Notations = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [templateArray, setTemplateArray] = useState(JSON.parse(localStorage.getItem('notations')) || []);

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

    const updateLocalStorage = (data) => {
        localStorage.setItem('notations', JSON.stringify(data));
        setTemplateArray(data)
    }

    const saveTemplate = (e) => {
        e.preventDefault();

        const template = {
            id: uuid4(),
            length: text.length,
            text
        }

        const updateData = [...templateArray, template];
        
        updateLocalStorage(updateData);
        setText('');
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={openModal} className='notation__button button'>
            </button>
            <TransitionGroup component={null}>
                <ModalNotation
                    text={text}
                    isOpen={isOpen}
                    saveTemplate={saveTemplate}
                    changeTextareaValue={changeTextareaValue}
                    closeModal={closeModal}
                />
            </TransitionGroup>
        </>
    );
};

const ModalNotation = (props) => {
    const {saveTemplate, changeTextareaValue, closeModal, text, isOpen} = props;

    let style = text.length > 200 ? 'long__template' : ''; 

    return (
        <CSSTransition
            in={isOpen}
            classNames='modal__notation'
            timeout={300}
            mountOnEnter
            unmountOnExit>
            <>
                <form 
                    onSubmit={saveTemplate}
                    className="notation__window"
                >
                    <h2>Введіть текст, який необхідно зберігти</h2>
                    <textarea value={text} 
                        type="text"
                        placeholder='Введіть текст' 
                        autoFocus
                        required
                        onChange={changeTextareaValue}
                    />
                    <button className='button'>Зберегти</button>
                    <div className={`notation__text_length ${style}`}>{text.length}/200</div>
                </form>
                <div onClick={closeModal} className="overlay"></div>
            </>
        </CSSTransition>
    )
} 

export default Notations;