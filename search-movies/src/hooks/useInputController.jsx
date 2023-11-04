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
        if (inputForm ==='') {
            setError('No se puede Buscar una pelicula vacia')
            return
        }
        if (inputForm.match(/^\d+$/)) {
            setError('No se puede buscar una pelicula con un numero')
            return
        }
        if (inputForm.length < 2) {
            setError('La busqueda debe tener al menos 2 caracteres')
            return
        }
        setError(null)
    }, [inputForm]
    )
    return { inputForm, setInputForm, error }
}