import React from 'react'
import App1 from './App1'


function Home() {
  return (
    <div>
      <div claas='rounded-lg'>
        <p behaviour="alternate"> 
          <span className="marque"> Welcome to Our HealthCare</span>
        </p>
      </div>
      <div>
        <React.StrictMode>
          <App1 />
        </React.StrictMode>,

      </div>

      <footer>
        <br></br>
        <br></br>
        <section className="abt">
          <h1> About Website</h1>
          <p>This is blockchain based health care web application</p>
          <div className="row-dl">
            <div className="card-col">
              <h3 className="color:pink"><b>What we are</b></h3>
              <p className='text-black'>
              EHR is one of secure healthcare organizations. <br></br>
              Runs on Ethereum Blockchain providing secure transactions over internet. <br></br>
              Apart from hospitals, EHR also operates a patient past health data with dates. 
              </p>
            </div>

            <div className="card-col">
              <h3 className='color:pink'><b>How to Use</b></h3>
              <p className='text-black'>
              Get registered by admin if you are patient/doctor. <br></br>
              If doctor then a Hospital verifies you with your credentials.
              If patient then login and access the Features of this application. <br></br>
              For Insurance Companies, you can get details of Patient unless patient or hospitals verifies to access Records.
              </p>
            </div>

            <div className="card-col">
              <h3 className="color:pink "><b>Features</b></h3>
              <p className='text-black items-center'>
                  Privacy <br></br>
                  Accuracy<br></br>
                  Performance<br></br>
                  Access Control<br></br>
                  Authentication<br></br>
                  Secure Transactions<br></br>
              </p>
            </div>
          </div>
        </section>
        <footer className="text-gray-600 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">EHR</span>
    </a>
    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">Preserving Medical Records —
      <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@EHR</a>
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a className="text-gray-500">
        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </a>
      <a className="ml-3 text-gray-500">
        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>
      <a className="ml-3 text-gray-500">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </a>
      <a className="ml-3 text-gray-500">
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
      </a>
    </span>
  </div>
</footer>
      </footer>
    </div>
  )
}

export default Home