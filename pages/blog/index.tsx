import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Seo } from '@/components/common/seo'

export interface BlogTopPageProps {
    blogs: any[]
}

export default function BlogTopPage({ blogs }: BlogTopPageProps) {
    // console.log('blogs', blogs)
    const { asPath } = useRouter();
    const cleanPath = asPath.split('#')[0].split('?')[0];

    return (
        <div>
            <Seo
                data={{
                    title: 'Blog Top page | NextJs',
                    description:
                        'List of blogs to learn about NextJs',
                    url: `${process.env.API_URL}${cleanPath}`,
                    thumbnailUrl:
                        'https://cdn.getshifter.co/caa65008efb706a8bfc6f7e4045d6a018420c3df/uploads/2020/11/nextjs.png',
                }}
            />

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