import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PokeCard from '../components/pokedex/PokeCard'
import SelectTypes from '../components/pokedex/SelectTypes'
import Header from '../components/shared/Header'
import './style/pokedex.css'

const Pokedex = () => {

  const {nameTrainer} = useSelector(state => state)

  const [pokemons, setPokemons] = useState()
  const [selectValue, setSeletValue] = useState('allpokemons')

  useEffect(() => {
    if(selectValue === 'allpokemon'){
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0'
    axios.get(url)
    .then(res => setPokemons(res.data))
    .catch(err => console.log(err))}else{
      axios.get(selectValue)
      .then(res=>{
        const results = res.data.pokemon.map(e => e.pokemon)
        setPokemons({results})
      })
      .catch(err=>console.log(err))
    }
  }, [selectValue])

  const navigate = useNavigate()

  const handleSubmit = e =>{
    e.preventDefault()
    const inputValue = e.target.pokemon.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
    e.target.pokemon.value=''
  }
  
  return (
    <div className='pokedex'>
      <Header />
      <div className="pokedex_head">
        <h1 className='pokedex_title'><span className='pokedex_title-span'>Hi {nameTrainer}</span>, here find your faorite pokemon.</h1>
        <div className="pokedex_head-form">
          <form className='pokedex_form' onSubmit={handleSubmit}>
            <input className='pokedex_input' id='pokemon' type="text" />
            <button className='pokedex_button'>Search</button>
          </form>
          <SelectTypes setSelectValue={setSeletValue}/>
        </div>
      </div>
      
      <div className='card_info'>
        {
          pokemons?.results.map(pokemon=>(
            <PokeCard
              key={pokemon.url}
              pokemon = {pokemon}
            />
          ))
        }
      </div>
    </div>
    
  )
}

export default Pokedex