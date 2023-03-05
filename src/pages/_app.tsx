import { Web3ReactProvider } from "@web3-react/core"
import Chakra from "components/_app/Chakra"
import ExplorerProvider from "components/_app/ExplorerProvider"
import IntercomProvider from "components/_app/IntercomProvider"
import { Web3ConnectionManager } from "components/_app/Web3ConnectionManager"
import { connectors } from "connectors"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"
import { IconContext } from "phosphor-react"
import { Fragment } from "react"
import { SWRConfig } from "swr"
import "theme/custom-scrollbar.css"
import fetcher from "utils/fetcher"

const App = ({
  Component,
  pageProps,
}: AppProps<{ cookies: string }>): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <Script src="/intercom.js" />
      <Chakra cookies={pageProps.cookies}>
        <IconContext.Provider
          value={{
            color: "currentColor",
            size: "1em",
            weight: "bold",
            mirrored: false,
          }}
        >
          <SWRConfig value={{ fetcher }}>
            <Web3ReactProvider connectors={connectors}>
              <Web3ConnectionManager>
                <IntercomProvider>
                  <ExplorerProvider>
                    <Component {...pageProps} />
                  </ExplorerProvider>
                </IntercomProvider>
              </Web3ConnectionManager>
            </Web3ReactProvider>
          </SWRConfig>
        </IconContext.Provider>
      </Chakra>
    </>
  )
}

export { getServerSideProps } from "components/_app/Chakra"

export default App
