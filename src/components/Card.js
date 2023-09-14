import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [quantity, setQuantity] = useState(1);
  const [ size, setSize] = useState("")
  const handleAddToCart = async ()=>{
    let food = []
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item;
        break;
      }
    }
    if (food !== []) {
      if(food.size === size){
        await dispatch({type:"UPDATE", id:props.foodItem._id, price:finalPrice, quantity:quantity})
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, img:props.foodItem.img, price:finalPrice, quantity:quantity, size:size})
        return
    // await console.log(data)
      }
      return
    }
    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, img:props.foodItem.img, price:finalPrice, quantity:quantity, size:size})
    
  }
  let finalPrice = quantity*parseInt(options[size]);
  useEffect(()=> {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div><div>
{/* //greencolor #343C3B */}
    <div className="card mt-3 border-2 bg-dark " style={{ "width": "18rem", "maxHeight": "360px", borderRadius:"20px", backgroundColor:" " }}>
    <img src={props.foodItem.img} className="card-img-top"  style={{height:"120px",objectFit:"fill" }} alt="..." />
    <div className="card-body">
      <h5 className="card-title">{props.foodItem.name}</h5>
      <div className='container w-100' >
        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQuantity(e.target.value)}>
          {Array.from(Array(6), (e,i)=>{
            return(
              <option key={i+1} value={i+1}>{i+1}</option>
            )
          })}
        </select>

        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
             {priceOptions.map((data) => {
              return <option key={data} value={data}>{data}</option>
             })}
        </select>
        <div className='d-inline h-100 fs-5'>&#x20B9;{finalPrice}/-</div>
      </div>
      <hr />
      <button className='btn btn-secondary justify-center ms-2' onClick={handleAddToCart} style={{btn:"hover", bg:"bg-success"}}>Add to cart</button>
    </div>
  </div></div></div>
  )
}
