import './Topbar.css'
import React, {useContext} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AppContext } from '../../../App'; 

export const Topbar = (props) => {
  const {                
    isOpen, setIsOpen,
    page, pageType, setPageType 
  } = useContext(AppContext);

  async function onClickS (e) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (     
    <div className='lyTop'>       
      <h1 onClick={(e) => onClickS(e)} > {page} </h1>
    
      <RowRadioButtonsGroup 
        pageType={pageType}
        setPageType={setPageType} />
    </div>
  )
}

const RowRadioButtonsGroup = (props) => {
  const {setPageType, pageType} = props

  const handleChange = (e) =>{
    e.preventDefault()   
    setPageType(e.target.value)    
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel 
          checked={pageType == 0} 
          value="0" 
          control={<Radio />} 
          label="Today" 
        />
        <FormControlLabel 
          checked={pageType == 1}
          value="1" 
          control={<Radio />} 
          label="Historic"
        />
      </RadioGroup>
    </FormControl>
  );
}

