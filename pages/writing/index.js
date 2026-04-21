import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getArchiveData } from '../../lib/archive'

export default function Writing({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Writing | {siteTitle}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Writing</h1>
      <p className={utilStyles.lightText}>Evergreen pieces worth returning to.</p>
      {posts.length === 0 ? (
        <p>Nothing here yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/blog/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getArchiveData().filter((p) => p.evergreen)
  return { props: { posts } }
}
