import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SideNavigation from './Navigation';

export default function Layout({children}) {
  return (
    <div className="layout">
      <Header />
      <div className='layout-body'>
        <SideNavigation />
        {children}
      </div>
      <Footer />
    </div>
  );
}