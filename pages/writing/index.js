import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getArchiveData } from '../../lib/archive'
import styles from './writing.module.css'

export default function Writing({ posts }) {
  return (
    <Layout>
      <Head>
        <title>{`Writing | ${siteTitle}`}</title>
        <meta name="description" content="Evergreen pieces by Eric Lee worth returning to." />
      </Head>
      <h1>Writing</h1>
      <p style={{ fontFamily: 'var(--f-ui)', fontSize: '13px', color: 'var(--faint)' }}>
        Evergreen pieces worth returning to.
      </p>
      {posts.length === 0 ? (
        <p style={{ color: 'var(--faint)', fontSize: '15px' }}>Nothing here yet.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id} className={styles.item}>
              <Link href={`/blog/${post.id}`} className={styles.title}>{post.title}</Link>
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
