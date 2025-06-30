import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { store } from './state/store'
import './scss/index.scss'

import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
    </StrictMode>
)