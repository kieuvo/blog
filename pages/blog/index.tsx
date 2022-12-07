import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
export interface BlogTopPageProps {
    blogs: any[]
}

export default function BlogTopPage({ blogs }: BlogTopPageProps) {
    // console.log('blogs', blogs)

    return (
        <div>
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