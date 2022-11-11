import './CustomForm.css'

export const CustomForm = (props) => {
  return (     
    <>
      {Object.keys(props.body).map( x => (
        <div 
          className='lyLine'
          key={x}>
          <h3> {x} </h3>
          <input/>
        </div>
      ))}

      { (props.body) ? 
        <button 
          className='btnSend'
          onClick={() => alert('tururu')}> 
        Enviar 
        </button>:null}

    </>
    
  )
}

