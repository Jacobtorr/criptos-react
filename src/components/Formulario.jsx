import { useState, useEffect } from "react";
import useSelectMonedas from "../hooks/useSelectMonedas";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;

const Formulario = ({setMonedas}) => {

    const monedas = [
        {id: 'USD', nombre: 'Dolar Estadounidense'},
        {id: 'VES', nombre: 'Bolivar Venezolano'},
        {id: 'MXN', nombre: 'Peso Mexicano'},
        {id: 'CLP', nombre: 'Peso Chileno'},
        {id: 'ARS', nombre: 'Peso Argentino'},
        {id: 'EUR', nombre: 'Euro'},
        {id: 'GBP', nombre: 'Libra Esterlina'},
    ];

    const [ criptos, setCriptos ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos);

    useEffect(() => {
      const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        const arrayCriptos = resultado.Data.map(cripto => {
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }

            return objeto;
        })
        setCriptos(arrayCriptos);

      }

      consultarAPI();
    }, []);


    const handleSubmit = e => {
        e.preventDefault();
        
        if([moneda, criptomoneda].includes('')) {
            setError(true);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Todos los campos son obligatorios!',
                showConfirmButton: true
              })
            return;
        }

        setError(false);
        setMonedas({
            moneda,
            criptomoneda
        });

    }
    

  return (
    <form
        onSubmit={handleSubmit}
    >

        <SelectMonedas/>
        <SelectCriptomoneda/>

        <InputSubmit 
            type="submit" 
            value="Cotizar" 
        />
    </form>
  )
}
export default Formulario