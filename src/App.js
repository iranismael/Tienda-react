import React,{useState} from "react";
import styled from "styled-components";
import { NavLink, Route, Routes } from "react-router-dom";
import Tienda from "./componentes/Tienda";
import Blog from "./componentes/Blog";
import Inicio from "./componentes/Inicio";
import Error404 from "./componentes/Error404";
import Carrito from "./componentes/Carrito";


const App = () => {
  const productos = [
    {id: 1, nombre:'producto1'},
    {id: 2, nombre:'producto2'},
    {id: 3, nombre:'producto3'},
    {id: 4, nombre:'producto4'},
];
const [carrito, cambiarCarrito] = useState([]);

const agregarProductoAlCarrito = (idProducto, nombre ) =>{

    //Si el carrito no tiene elementos entonces agregamos uno
  if(carrito.length === 0){
    cambiarCarrito([{id:idProducto, nombre:nombre, cantidad:1}]);
  }else{
    //De otro forma tenemos que revisar que el carrito no tenga ya el producto agregado
    //Si ya lo tiene actualizamos el valor
    //Si no entonces lo agregamos
    //Para poder editar el arreglo tenemos que clonarlo
    const nuevoCarrito = [...carrito];

    //Comprobar si el carrito ya tiene el ID del producto

    const YaEstaEnCarrito = nuevoCarrito.filter( ( productoDeCarrito )=>{
      return productoDeCarrito.id === idProducto
    }).length > 0;
    
    //Si ya esta en producto entonces lo actualizamos
    if(YaEstaEnCarrito){
      //Para ello  tenemos que buscarlo, obtener su posicion en el arreglo
      //y en base a su posicion lo actualizamos

      nuevoCarrito.forEach((productoDeCarrito, index)=> {

        if(productoDeCarrito.id === idProducto){
          const cantidad = nuevoCarrito[index].cantidad;
          nuevoCarrito[index] ={
            id:idProducto,
            nombre:nombre,
            cantidad:cantidad +1
          }
        }

      });
      //De otra forma entonces  agregamos el producto al arreglo
    }else{
      nuevoCarrito.push(
        {
          id:idProducto,
          nombre: nombre,
          cantidad: 1
        }
      );
    }
    //Actualizar el carrito
    cambiarCarrito(nuevoCarrito);

  }
}

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>

      <main>
        <Routes>

          <Route path="*" element={<Error404/> } />

          <Route path="/" element={
            <Inicio productos={productos}/> 
            } 
          />
          <Route path="/blog" element={
            <Blog productos={productos} /> 
            } 
          />
          <Route path="/tienda" element={
            <Tienda 
              productos={productos}
              agregarProductoAlCarrito = {agregarProductoAlCarrito} 
            /> 
            } 
          />

          
        </Routes>

      </main>

      <aside>
            <Carrito carrito={carrito}/>
      </aside>
    </Contenedor>

  )
}

const Contenedor = styled.div`
	max-width: 1000px;
	padding: 40px;
	width: 90%;
	display: grid;
	gap: 20px;
	grid-template-columns: 2fr 1fr;
	background: #fff;
	margin: 40px 0;
	border-radius: 10px;
	box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
	width: 100%;
	text-align: center;
	background: #092c4c;
	grid-column: span 2;
	border-radius: 3px;

	a {
		color: #fff;
		display: inline-block;
		padding: 15px 20px;
	}

	a:hover {
		background: #1d85e8;
		text-decoration: none;
	}
`;

export default App