import './Topbar.css'

export const Topbar = (prop) => {
  const {isOpen, setIsOpen} = prop
  const {page} = prop

  async function onClickEntreno(e) {
    e.preventDefault()
      fetch('/api/workout')
      .then(response => response.json())
      .then(data => setBody(data));
  }
  async function onClickComida (e) {
    e.preventDefault()
      fetch('/api/foot')
      .then(response => response.json())
      .then(data => setBody(data));

  }

  async function onClickMedidas (e) {
    e.preventDefault()
      fetch('/api/size')
      .then(response => response.json())
      .then(data => setBody(data));
  }

  async function onClickS (e) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  
  return (     
    <div className='lyTop'>
      
      <h2>
      <button onClick={(e) => onClickS(e)}>Sidebar</button>
      </h2>
      <h2>
      {page}
      </h2>

    </div>
  )
}

