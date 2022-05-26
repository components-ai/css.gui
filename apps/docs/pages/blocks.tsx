import Link from 'next/link'
import pkg from '../../../packages/gui/package.json'

export default function Blocks() {

  const data = {
    quote: {
      text: 'A sample quote of great importance that helps people understand something really well',
      author: 'Author name',
      cite: 'Book or article name',
    },
    stat: {
      term: 'Page views',
      description: '103,218'
    },
    card: {
      title: 'Card title',
      text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
    },
    alert: {
      text: 'This is an alert'
    },
    input: {
      label: 'Form label'
    },
  }

  return (
    <section sx={{ py: 5, px: 5 }}>
      <h1 sx={{ my: 0 }}>Markup</h1>
      <article>
        <h3>Blockquote</h3>  
        <figure>
          <blockquote>
            <p>{data.quote.text}</p>  
          </blockquote>
          <figcaption>
            <span>{data.quote.author}</span>
            <cite>{data.quote.cite}</cite>
          </figcaption>
        </figure>
      </article>
      <article>
        <h3>Slab Stat</h3>  
        <dl>
          <dt>{data.stat.term}</dt> 
          <dt>{data.stat.description}</dt> 
        </dl>
      </article>
      <article>
        <h3>Card Link</h3>  
        <a>
            <img src='https://source.unsplash.com/random' />
            <h4>{data.card.title}</h4> 
            <p>
              {data.card.text}
            </p>
        </a>
      </article>
      <article>
        <h3>Alert</h3>  
          <article role='alert'>
            <p>{data.alert.text}</p> 
          </article>
      </article>
      <article>
        <h3>Text Input</h3>  
          <div>
            <label>
              <span>{data.input.label}</span>
              <input type='text' />
            </label>
          </div>
      </article>
      <article>
        <h3>Link List</h3>  
        <ul>
          <li><a>Home</a></li>
          <li><a>Shop</a></li>
          <li><a>About</a></li>
          <li><a>Sign In</a></li>
        </ul>
      </article>
      <article>
        <h3>Link List</h3>  
        <ul>
          <li><a>Home</a></li>
          <li><a>Shop</a></li>
          <li><a>About</a></li>
          <li><a>Sign In</a></li>
        </ul>
      </article>
      <article>
        <h3>Images</h3>  
        <section>
          <img src='https://source.unsplash.com/random/1024x512' />
          <img src='https://source.unsplash.com/random/1024x510' />
          <img src='https://source.unsplash.com/random/1024x508' />
          <img src='https://source.unsplash.com/random/1024x506' />
          <img src='https://source.unsplash.com/random/1024x504' />
          <img src='https://source.unsplash.com/random/1024x502' />
          <img src='https://source.unsplash.com/random/1024x500' />
          <img src='https://source.unsplash.com/random/1024x498' />
        </section>
      </article>
      <article>
        <h3>Pagination</h3>  
        <nav>
          <ul>
            <li><a>Previous</a></li>
            <li><a>1</a></li>
            <li><a>2</a></li>
            <li><a>3</a></li>
            <li><a>Next</a></li>
          </ul>
        </nav>
      </article>
    </section>
  )
}
