import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';

export interface BlogTopPageProps {
    blogs: any[]
}

export default function BlogTopPage({ blogs }: BlogTopPageProps) {
    // console.log('blogs', blogs)
    const { asPath } = useRouter();
    const cleanPath = asPath.split('#')[0].split('?')[0];

    return (
        <div>
            <Head>
                <title>Blog Top page</title>
                <meta property="og:title" content="Blog Top page" key="title" />
                <meta name="description" content="List of blogs to learn about NextJs" />
                <meta property="og:description" content="List of blogs to learn about NextJs" />
                <meta property="og:url" content={`${process.env.API_URL}${cleanPath}`} />
                <meta property="og:type" content="article" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Blog Top Page</h1>

            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blog/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export const getStaticProps: GetStaticProps<BlogTopPageProps> = async (
    context: GetStaticPropsContext
) => {
    // server-side
    // build-time
    // console.log('static props')
    const response = await fetch('http://blog.kathy.cba/api/blog/index?page=1')
    const data = await response.json()
    console.log(data.data)

    return {
        props: {
            blogs: data.data.map((x: any) => ({ id: x.id, title: x.title, slug: x.slug })),
        },
    }
}