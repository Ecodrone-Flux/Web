import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHome, faTags, faFileContract, faTruck, faClipboardList, faClipboard, faUser, faBox, faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './SideNavBar.css';

function SideBar() {
  return (
    <div>
      <div className="menu">
      <div className="item">
          <Link to="/HomeClient">
            <FontAwesomeIcon icon={faHome} />
            &nbsp; Inicio
          </Link>
        </div>


        
      </div>
    </div>
  );
}

export default SideBar;
