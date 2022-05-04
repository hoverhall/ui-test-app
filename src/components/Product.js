import { useEffect, useState } from 'react'
import './css/Product.css'
import Input from './Input'
import { sendData } from '../requestWorker'

const Product = (props) => {
    const [input1Enable, setInput1Enable] = useState(false)
    const [input2Enable, setInput2Enable] = useState(false)
    const [sendRequest, setSendRequest] = useState(false);
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    useEffect(() => {
        if (input1Enable && input2Enable) {
            console.log(`id: ${props.cardData.id}, name: ${name}, phone: ${number}`)
            sendData(props.cardData.id, name, number)
        }
        setSendRequest(false)
        setInput1Enable(false)
        setInput2Enable(false)
    }, [input1Enable, input2Enable])

    function sendId () {
        let id = Math.floor(Math.random() * 10000) + 1;
        setSendRequest(id)
    }

    return (
        <section className="product-card">
            <div className="product-card-backyard" scroll="no">
                <div className="product-card-area">
                    <div className='product-card-area-closebtn' onClick={props.close}>
                        <div></div>
                        <div></div>
                    </div>
                    <span className='product-card-category'>{props.cardData.category}</span>
                    <span className='product-card-name'>{props.cardData.name}</span>
                    <span className='product-card-price'>{props.cardData.price}</span>
                    <Input
                        placeholder={'Name'}
                        lettersOnly={true}
                        lettersOnlyText={'Only letters allowed'}
                        required={true}
                        requiredText={'This field in required'}
                        setValue={setName}
                        onGet={sendRequest}
                        onGetFunc={setInput1Enable}
                    />
                    <Input
                        placeholder={'Number'}
                        numbersOnly={true}
                        numbersOnlyText={'Only numbers allowed'}
                        fixedChars={12}
                        fixedCharsEnabled={true}
                        fixedCharsText={'Should contain 12 characters'}
                        required={true}
                        requiredText={'This field in required'}
                        setValue={setNumber}
                        onGet={sendRequest}
                        onGetFunc={setInput2Enable}
                    />
                    <button onClick={sendId}>ORDER</button>
                </div>
            </div>
        </section>
    )
}

export default Product;