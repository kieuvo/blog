import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import Head from 'next/head'

export interface BlogPageProps {
    blog: any
}

export default function BlogDetailPage({ blog }: BlogPageProps) {
    const router = useRouter()
    const { asPath } = useRouter();
    const cleanPath = asPath.split('#')[0].split('?')[0];
    if (router.isFallback) {
        return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>
    }

    if (!blog) return null

    return (
        <div>
            <Head>
                <title>Blog detail page</title>
                <meta property="og:title" content={blog.title} key="title" />
                <meta name="description" content={blog.summary} />
                <meta property="og:description" content={blog.summary} />
                <meta property="og:url" content={`${process.env.API_URL}${cleanPath}`} />
                <meta property="og:image" content={blog.image} />
                <meta property="og:type" content="article" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Blog Detail Page</h1>
            <p>{blog.title}</p>
            <p>{blog.image}</p>
            <p>{blog.content}</p>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    console.log('\nGET STATIC PATHS')
    const response = await fetch('http://blog.kathy.cba/api/blog/index?_page=1')
    const data = await response.json()
    // console.log(data)
    return {
        paths: data.data.map((blog: any) => ({ params: { blogId: blog.id.toString() } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
    context: GetStaticPropsContext
) => {
    console.log('\nGET STATIC PROPS', context.params?.blogId)
    const blogId = context.params?.blogId
    if (!blogId) return { notFound: true }
    const response = await fetch(`http://blog.kathy.cba/api/blog/detail/${blogId}`)
    const data = await response.json()
    // console.log(data)
    return {
        props: {
            blog: data.data,
        },
        revalidate: 50,
    }
}