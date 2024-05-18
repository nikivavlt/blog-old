import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom';
import Logotype from 'assets/images/logotype.svg';

import './Header.scss';
import SearchBar from 'components/SearchBar/SearchBar';

const Header = (): JSX.Element => {
  const { currentUser, signOut } = useContext(AuthContext);
  return (
    <header>
      <div>
        <Link className='logotype' to='/'>
          <img src={Logotype} alt="Creation Agency logotype" />
        </Link>
        <div>
          <SearchBar></SearchBar>
          <div className='links'>
            <span>
              <span>
                { currentUser &&
                <Link to={`/users/${(currentUser?.username).toLowerCase()}`}>
                  { currentUser?.username }
                </Link>
                }
              </span>
                <span>
                  { currentUser?.username
                    ? <span onClick={signOut}>Sign out</span>
                    : <span>
                        <Link to='/signin'>
                          <h3>
                            Sign in
                          </h3>
                        </Link>
                      </span>}
                </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

// const Header = (): JSX.Element => {
//   const { currentUser, signOut } = useContext(AuthContext)

//   return (
//     <header>
//       <div className='header'>
//         <div className='container'>
//           <div className='logo'>
//             <Link to='/'>
//               <img src={Logotype} alt="Creation Agency logotype" />
//             </Link>
//           </div>
//           <div className='links'>
//             <span>
//               { currentUser?.username }
//             </span>
//             <span>
//               { currentUser?.username 
//                 ? <span onClick={signOut}>Sign out</span>
//                 : <span>
//                     <Link to='/signin'>
//                       <h3>
//                         Sign in
//                       </h3>
//                     </Link>
//                   </span>}
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

export default Header;
