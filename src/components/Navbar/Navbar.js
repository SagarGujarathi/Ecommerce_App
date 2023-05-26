
import '../../css/Navbar/Navbar.css'
import logo from '../../images/logo.svg'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useReducer } from 'react';
import SearchResultItem from '../SearchResultItem';
import Badge from '@mui/material/Badge';
const TYPES = {
    ISICONSVISIBLE: 'isiconsvisible',
    ISNAVLINKSVISIBLE: 'isnavlinksvisible',
    ISSEARCHRESULTSVISIBLE: 'issearchresultsvisible',
    SEARCHRESULT: 'searchresult',
    ISCARTVISIBLE: 'iscartvisible'
}
const stateTemplate = {
    isIconsVisible: false,
    isNavLinksVisible: true,
    isSearchResultsVisible: false,
    searchValue: '',
    searchResult: [],
    isCartVisible: false
}
function Navbar({ productData, cartData }) {
    function handleState(state, { type, payload }) {
        switch (type) {
            case TYPES.ISICONSVISIBLE:
                return { ...state, isIconsVisible: payload }
            case TYPES.ISNAVLINKSVISIBLE:
                return { ...state, isNavLinksVisible: payload }
            case TYPES.ISSEARCHRESULTSVISIBLE:
                return { ...state, isSearchResultsVisible: payload }
            case TYPES.SEARCHRESULT:
                if (payload != '' && payload != ' ') {
                    const result = productData.map(section => {
                        return section.sectionItems.map(innerSection => {
                            return innerSection.sectionItems.filter(item => item.itemName.toLowerCase().includes(payload.toLowerCase()))
                        })
                    }).flat(1000)
                    if (result.length > 0) {
                        return { ...state, searchValue: payload, isSearchResultsVisible: true, searchResult: result }

                    }
                }
                return { ...state, searchResult: payload, isSearchResultsVisible: false }
            case TYPES.ISCARTVISIBLE:
                return { ...state, isCartVisible: payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(handleState, stateTemplate)
    function handleResize() {
        dispatch({ type: TYPES.ISICONSVISIBLE, payload: !(window.innerWidth <= 1200) })
        dispatch({ type: TYPES.ISNAVLINKSVISIBLE, payload: !(window.innerWidth <= 1000) })
    }
    function handleClick() {
        if (state.isSearchResultsVisible == true || state.searchResult.length > 0) {
            dispatch({ type: TYPES.ISSEARCHRESULTSVISIBLE, payload: false })
            dispatch({ type: TYPES.SEARCHRESULT, payload: '' })
        }
        if (state.isCartVisible == true) {
            dispatch({ type: TYPES.ISCARTVISIBLE, payload: false })
        }
    }
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    })
    return (
        <>
            <section>
                <div className="nav-bar">
                    <img src={logo} className='logo' />
                    {
                        state.isNavLinksVisible ?
                            <div className="navigation">
                                <ul className="links-container">
                                    <li className="link">Category</li>
                                    <li className="link">Deals</li>
                                    <li className="link">What's New</li>
                                    <li className="link">Delivery</li>
                                </ul>
                                <div className="search-bar-container">
                                    <input type="text" className='search-bar' placeholder='Search Product' onChange={(e) => dispatch({ type: TYPES.SEARCHRESULT, payload: e.target.value })} />
                                    <SearchIcon />
                                </div>
                                {
                                    state.isSearchResultsVisible ?
                                        <div className="search-result-container">
                                            {
                                                state.searchResult.map(product => {
                                                    return <SearchResultItem productData={product} />
                                                })
                                            }
                                        </div>
                                        : ''
                                }
                            </div>
                            : ''
                    }
                    {
                        state.isNavLinksVisible ?
                            <>
                                <div className="account-cart-container">
                                    <span><PersonIcon />{state.isIconsVisible ? 'Account' : ''}</span>
                                    <span onClick={() => dispatch({ type: TYPES.ISCARTVISIBLE, payload: !state.isCartVisible })}>
                                        <Badge color="primary" badgeContent={cartData.cartCount} max={99} sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 } }}>
                                            <AddShoppingCartIcon />
                                        </Badge>
                                        {state.isIconsVisible ? 'Cart' : ''}
                                    </span>
                                    {state.isCartVisible ? < div className="add-to-cart-result-container">
                                        {
                                            cartData.cartData.map(product => {
                                                return <SearchResultItem productData={product} />
                                            })
                                        }
                                    </div> : ''}
                                </div>
                            </>
                            :
                            <MenuIcon />
                    }
                </div>
            </section >
        </>
    )
}

export default Navbar