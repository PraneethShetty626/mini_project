import React from 'react'
import App1 from './App1'
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';


function Home() {
  return (
    <div>
      <div claas='rounded-lg'>
        <marquee behaviour="alternate" onmouseover="this.stop()" onmouseout="this.start()"> <span className="marque">Hello Welcome to Our HealthCare</span> </marquee>
      </div>
      <div>
        <React.StrictMode>
          <App1 />
        </React.StrictMode>,

      </div>

      <footer>
        <br></br>
        <br></br>
        <section class="abt">
          <h1> About Website</h1>
          <p>This is blockchain based health care web application</p>
          <div class="row-dl">
            <div class="card-col">
              <h3 class="color:pink"><b>What we do</b></h3>
              <ul >
                <li class="text-green">Tracking / registry: Recording information and data in an immutable and transparent way, whereby no party has asymmetric power over the data</li>
                <li>Data access / transfer: Easing transfer of data between multiple parties, to create a common source of “truth”</li>
                <li>Identity / authentication: Managing identities and permissions for authentication or verification, </li>
              </ul>
            </div>

            <div class="card-col">
              <h3 className='color:pink'><b>How to Use</b></h3>
              <ul>
                <li> good example of a paragraph contains a topic sentence, details and a conclusion. </li>
                <li>There are many different kinds of animals that live in China. </li>
                <li>Tigers and leopards are animals that live in China's forests in the north.</li>
              </ul>
            </div>

            <div class="card-col">
              <h3 class="color:pink"><b>Features</b></h3>
              <ul>
                <li> good example of a paragraph contains a topic sentence, details and a conclusion. </li>
                <li>There are many different kinds of animals that live in China. </li>
                <li>Tigers and leopards are animals that live in China's forests in the north.</li>
              </ul>
            </div>
          </div>
        </section>
        <section class="footer">
          <h4 >Contact Us</h4>
          <p>Thank you for visiting our page </p>
          <div className='flex justify-center items-center'>
            <div className='flex items-center justify-between'>
              <div className='mr-3 '><FaInstagram /></div>
              <div className='mr-3 '><FaLinkedin /></div>
              <div className='mr-3 '><FaTwitter /></div>
              <div><FaMailBulk /></div>
            </div>
          </div>
          <p className='flex items-center justify-center'>Made with  <div className='text:red'><FaHeart /></div></p>
        </section>
      </footer>
    </div>
  )
}

export default Home