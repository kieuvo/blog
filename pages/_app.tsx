import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppPropsWithLayout } from '@/models/common'
import { EmptyLayout } from '@/components/layout'
// import axiosClient from '@/api/axios-client'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  console.log('App re-render')
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
