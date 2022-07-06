import React, { Component } from "react";


class NavbarComp extends Component {

  render() {
    let isLogged = this.props.isLogged ? true : false;

    return (
      <>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <span className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium">E H R</span>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <div className="ml-3 relative">
                  <div>
                    {isLogged && <button type="button" onClick={() => this.props.onlogout()} className="text-white bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      LOGOUT
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>


      </>
    );
  }
}


export default NavbarComp;