import { useEffect, useRef, useState } from 'react'
import './css/Input.css'

const Input = (props) => {
    let onGet = props.onGet
    let ref = useRef(null)
    if (props.lettersOnly && props.numbersOnly) {
        throw new Error(`Unable to set 'lettersOnly' and 'numbersOnly' at one time.`)
    }

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let inputRef = {target: ref.current}
        if (onGet) {
            checkValue(inputRef)
        }
    }, [onGet])
    
    const checkValue = (e) => {
        function letters (e) {
            let str = e.target.value;
            let exp_str = str.match(/\p{L}/gu);
            if (str === exp_str.join("")) {
                setErrorMessage('')
                props.setValue(e.target.value)
                props.onGetFunc(true)
            } else {
                setErrorMessage(props.lettersOnlyText)
                props.onGetFunc(false)
            }
        }
        function numbers (e) {
            let str = e.target.value;
            let exp_str = str.replace(/[^\d]/g, '');
            if (str === exp_str) {
                setErrorMessage('')
                props.setValue(e.target.value)
                props.onGetFunc(true)
            } else {
                setErrorMessage(props.numbersOnlyText)
                props.onGetFunc(false)
            }
        }
        function length (e) {
            if (e.target.value.length === props.fixedChars) {
                setErrorMessage('')
                props.setValue(e.target.value)
                props.onGetFunc(true)
            } else {
                setErrorMessage(props.fixedCharsText)
                props.onGetFunc(false)
            }
        }

        if (e.target.value.length) {
            if (props.fixedCharsEnabled && props.lettersOnly) {
                letters(e)
                length(e)
            } else if (props.fixedCharsEnabled && props.numbersOnly) {
                numbers(e)
                length(e)
            } else if (props.lettersOnly) {
                letters(e)
            } else if (props.numbersOnly) {
                numbers(e)
            }
        } else {
            props.required && setErrorMessage(props.requiredText)
        }
    }

    return (
        <div className="input-block">
            <input
                className={`input-line ${errorMessage !== '' ? 'warning' : ''}`}
                placeholder={props.placeholder}
                onFocus={() => setErrorMessage('')}
                onBlur={checkValue}
                ref={ref}/>
            <span className="input-error-msg">{errorMessage}</span>
        </div>
    )
}

export default Input