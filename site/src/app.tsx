import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { SWRConfig } from "swr"
import { AppRouter } from "./AppRouter"
import { GlobalSnackbar } from "./components/Snackbar/GlobalSnackbar"
import { light } from "./theme"
import "./theme/globalFonts"
import { XServiceProvider } from "./xServices/StateContext"

export const App: React.FC = () => {
  return (
    <Router>
      <SWRConfig
        value={{
          // This code came from the SWR documentation:
          // https://swr.vercel.app/docs/error-handling#status-code-and-error-object
          fetcher: async (url: string) => {
            const res = await fetch(url)

            // By default, `fetch` won't treat 4xx or 5xx response as errors.
            // However, we want SWR to treat these as errors - so if `res.ok` is false,
            // we want to throw an error to bubble that up to SWR.
            if (!res.ok) {
              const err = new Error((await res.json()).error?.message || res.statusText)
              throw err
            }
            return res.json()
          },
        }}
      >
        <XServiceProvider>
          <ThemeProvider theme={light}>
            <CssBaseline />
            <AppRouter />
            <GlobalSnackbar />
          </ThemeProvider>
        </XServiceProvider>
      </SWRConfig>
    </Router>
  )
}
