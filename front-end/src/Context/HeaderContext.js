import React,{createContext, useState} from 'react';

export const headerContext = createContext();

function HeaderContextProvider({children}) {
 
  const [open ,setOpen] = useState('')




  const showMenu =()=>{
    setOpen('open');
    
    open && setOpen('') 
  }

  return (
    <headerContext.Provider value={{open ,setOpen,showMenu}}>
      {children}
    </headerContext.Provider>
  )
}

export default HeaderContextProvider
