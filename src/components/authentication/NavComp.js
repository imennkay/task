import React, { useContext, useState } from 'react';
import logoImg from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { AddAuction } from '../auctions/AddAuction';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';
import { ProgressBar } from '../auctions/ProgressBar';

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [auction, setAuction] = useState(null);

  return (
    <nav className="container navbar sticky-top navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src={logoImg} alt="logo" height="75" />
        </div>
        <div className="d-flex">
          <div className="col">
            {currentUser ? (
              <div>
                {auction && <ProgressBar auction={auction} setAuction={setAuction} />}
                <div className="btn  mx-2"> <AddAuction setAuction={setAuction} /></div>
                <div className="btn btn-outline-secondary mx-2 disabled">
                  {currentUser.email}
                </div>
                <div
                  onClick={() => logout()}
                  className="btn btn-outline-secondary mx-2"
                >

                  Logout
                </div>

              </div>
            ) : (
              <div>
                <LoginComp />
                <RegisterComp />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav >
  );
};
