import './css/App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectApi, asyncData } from './features/products/ProductsSlice';
import ProductsItem from './components/ProductItem';
import Product from './components/Product';

function App() {
  const dispatch = useDispatch()

  const [localData, setLocalData] = useState([])
  const [cardData, setCardData] = useState(null)
  const [cardOpened, setCardOpened] = useState(false)

  const async_data = useSelector(selectApi)

  useEffect(() => {
    dispatch(asyncData())
  }, [dispatch])

  useEffect(() => {
    setLocalData(async_data)
  }, [async_data])

  const buyCheapest = () => {
    let idList = []
    let sumList = []
    new Promise(res => {
      for (let item of localData) {
        idList.push(item.id)
        sumList.push(item.price)
      }
      res(Math.min(...sumList))
    })
    .then((min) => {
      return sumList.map((item, index) => {
        item === min && setCardData(localData[index])
        return null;
      })
    })
    .then(() => {
      setCardOpened(true)
    })
  }

  const buy = (index) => {
    setCardData(localData[index])
    setCardOpened(true)
  }

  const close = () => {
    setCardOpened(false)
  }

  return (
    <div className="App">
      <div className='products-list'>
        {localData.length ? localData.map((item, i) => (
            <ProductsItem key={i} productData={{...item, index: i}} buy={buy}/>
        )) : <></> }
        <button onClick={buyCheapest}>Buy cheapest</button>
      </div>
      {cardOpened && <Product cardData={cardData} close={close} />}
    </div>
  );
}

export default App;
