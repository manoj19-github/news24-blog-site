import '../styles/globals.css'

import Layout from "../components/Layout"
import {Provider} from "react-redux"
import store from "../redux/store"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  if(Component.getLayout){
    return Component.getLayout(

          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>

     )
  }
  return(

          <Provider store={store}>
            <Layout className="dark">
              <Component {...pageProps} />
            </Layout>
        </Provider>

  )


}

export default MyApp
