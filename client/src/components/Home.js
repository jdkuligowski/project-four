import { useNavigate, Link } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate()




  return (
    <section className='page-wrapper'>
      <section className='top-section'>
        <div className='intro-content'>
          <h1>Welcome to SkiAgent</h1>
        </div>
        <div className='intro-buttons'>
          <button>
            <Link className='page-link' to='/resorts'>Find a resort</Link>
          </button>
          <button>
            Plan a trip in resort
          </button>
        </div>
      </section>

      <section className="middle-section">
        <div className='resort-content'>
          <h1>Resort Finder</h1>
          <h3>Our resort list and resort finder will help you search through the best destinations to ski in the Alps.</h3>
        </div>



      </section>

      <section className="bottom-section">



      </section>

    </section>
  )
}

export default Home