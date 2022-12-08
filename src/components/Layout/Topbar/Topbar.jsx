import './Topbar.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const Topbar = (props) => {
  const {isOpen, setIsOpen} = props
  const {page} = props
  const {pageType, setPageType} = props

  async function onClickS (e) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  
  return (     
    <div className='lyTop'>
      <div>     
        {/* <button onClick={(e) => onClickS(e)}>Sidebar</button> */}
        <h2 onClick={(e) => onClickS(e)} > {page} </h2>
      </div>
      <RowRadioButtonsGroup pageType={pageType} setPageType={setPageType} />
    </div>
  )
}

const RowRadioButtonsGroup = (props) => {
  const {pageType, setPageType} = props

  const handleChange = (e) =>{
    e.preventDefault()
    alert(e.target.value)
    setPageType(e.target.value)
    
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={pageType}
        onChange={handleChange}
      >
        <FormControlLabel value="0" control={<Radio />} label="Today" />
        <FormControlLabel value="1" control={<Radio />} label="Historic" />
      </RadioGroup>
    </FormControl>
  );
}

