import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
export interface BlogListPageProps {
    blogs: any[]
}

export default function BlogListPage({ blogs }: BlogListPageProps) {
    // console.log('blogs', blogs)

    return (
        <div>
            <h1>Blog List by Category</h1>

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

export const getStaticPaths: GetStaticPaths = async () => {
    console.log('\nGET STATIC PATHS')
    const response = await fetch('http://blog.kathy.cba/api/blog/index?_page=1')
    const data = await response.json()

    return {
        paths: data.data.map((blog: any) => ({ params: { category: [`${blog.category}`] } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<BlogListPageProps> = async (
    context: GetStaticPropsContext
) => {
    // server-side
    // build-time
    // console.log('static props')
    const category = context.params?.category
    const response = await fetch(`http://blog.kathy.cba/api/blog/index?_category=${category}`)
    const data = await response.json()
    console.log(data)

    return {
        props: {
            blogs: data.data.map((x: any) => ({ id: x.id, title: x.title, category: x.category })),
        },
    }
}