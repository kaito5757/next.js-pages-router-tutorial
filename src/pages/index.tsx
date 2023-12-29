import Layout, { siteTitle } from '@/components/Layout/layout'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <Link href="http://localhost:3000/posts/first-post">
        first-post
      </Link>
    </Layout>
  )
}
