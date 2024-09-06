import Header from "./assets/components/Header"
import Guitar from "./assets/components/Guitar"
import { useState, useEffect } from "react"
import { db } from "./data/db"
function App() {

  // //State

  // const [auth, setAuth] = useState([])
  // const [total, setTotal] = useState(0)
  // const [cart, setCart] = useState([])

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  const valorMax = 5;
  const valorMin = 1;


  useEffect(() => {

    localStorage.setItem('cart', JSON.stringify(cart))

  }, [cart])


  //Carrito

  //funcion para agregar elememntos al carrito
  function addToCart(item) {

    //Revisando si la guitarra que desea agregar ya existe en el carrito o no 

    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= valorMax) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)


    } else {

      item.quantity = 1
      setCart([...cart, item])
    }


  }


  // funcion para eliminar elementos del carrito
  function removeFromCart(id) {

    setCart(prueba => prueba.filter(guitar => guitar.id !== id))

  }

  //funcion para incrementar elementos carrrito

  function incrementoCantidad(id) {

    const actualizarCarrito = cart.map(item => {
      if (item.id === id && item.quantity < valorMax) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(actualizarCarrito)

  }


  // funcion para decrementar 
  function decrementoCantidad(id) {
    const actualizarCarrito = cart.map(item => {
      if (item.id === id && item.quantity > valorMin) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(actualizarCarrito)
  }


  //Funcion Limpiar carrito

  function limpiarCarrito() {
    setCart([])
  }





  return (
    <>

      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementoCantidad={incrementoCantidad}
        decrementoCantidad={decrementoCantidad}
        limpiarCarrito={limpiarCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>


        <div className="row mt-5">

          {data.map((guitar) => {
            return (

              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />

            )
          })}

        </div>

      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados Oscar Murillo</p>
        </div>
      </footer>

    </>
  )
}

export default App
