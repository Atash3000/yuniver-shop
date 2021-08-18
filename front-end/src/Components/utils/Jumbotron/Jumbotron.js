
import './Jumbotron.scss';
function Jumbotron(props) {
  return (
    <div className={`Jumbotron ${props.className}`}>
      
      <h2 className="Jumbotron__text">{props.title}</h2>
      
    </div>
  )
}

export default Jumbotron

