import React,{createContext,useState,useEffect} from 'react'

const SearchContext = createContext([]) 

export const SearchContextProvider = ({children}) => {
    const [categories,setCategories] = useState([])
    const [AddProduct,setAddProduct] = useState([])

    return (
        <SearchContext.Provider value={{setCategories,categories,AddProduct,setAddProduct}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
