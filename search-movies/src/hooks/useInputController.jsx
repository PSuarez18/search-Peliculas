import { useEffect, useRef, useState } from 'react'

export const useSearch = () => {
    const [inputForm, setInputForm] = useState('')
    const [error, setError] = useState('')
    const isFirstInput = useRef(true) //esta bandera es para ver si es la primera busqueda

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = inputForm === ''    // aca hace la validacion si es la primera busqueda de la pelicula sabiendo la igualacion si es  true 
            return
        }
        if (inputForm === '') {
            setError('Por favor, ingresa el nombre de una película para buscar.')
            return
        }

        if (inputForm.length < 2) {
            setError('La busqueda debe tener al menos 2 caracteres')
            return
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(inputForm)) {
            setError('La búsqueda no debe contener caracteres especiales.');
            return;
        }
        setError(null)
    }, [inputForm]
    )
    return { inputForm, setInputForm, error }
}