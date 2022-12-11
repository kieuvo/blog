import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { Seo } from '@/components/common/seo'

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
            <Seo
                data={{
                    title: `${blog.title} | NextJs`,
                    description: blog.summary,
                    url: `${process.env.API_URL}${cleanPath}`,
                    thumbnailUrl: blog.image,
                }}
            />
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