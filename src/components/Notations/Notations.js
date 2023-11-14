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
            <TransitionGroup component={null}>
                <ModalNotation
                    text={text}
                    isOpen={isOpen}
                    updateNotation={updateNotation}
                    changeTextareaValue={changeTextareaValue}
                    closeModal={closeModal}
                />
            </TransitionGroup>
        </>
    );
};

const ModalNotation = (props) => {
    const {updateNotation, changeTextareaValue, closeModal, text, isOpen} = props;

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
                    onSubmit={updateNotation}
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