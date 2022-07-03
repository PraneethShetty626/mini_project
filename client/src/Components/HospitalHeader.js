import React from 'react'

function HospitalHeader(props) {
  return (
    <div>
        <nav className="bg-white w-full border-b md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="javascript:void(0)">
                        {props.name}
                    </a>
                  <div className="md:hidden">
                      <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                          
                      >
                          {
                              
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                              
                                  
                          }
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 hidden`}>
                 
              </div>
              <div className="hidden md:inline-block">
                <a href="javascript:void(0)" className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                    Get Started
                </a>
              </div>
          </div>
      </nav>
    </div>
  )
}

export default HospitalHeader