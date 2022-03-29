import Head from 'next/head';

import styles from '../styles/Home.module.css'
import { iArticle } from '../interface';
import { epochToDateTime } from '../helpers';

const Home = ({ articles }: { articles: Array<iArticle> }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Interactive Articles</title>
        <meta name="description" content="Co:rise interactive articles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px',
        justifyContent: 'center'
      }}>
        <h1 style={{ fontSize: '36px', textAlign: 'center', }}>
          Interactive Articles
        </h1>
        <div>
          {articles.map(({ Author, Title, Timestamp, Slug }:iArticle,idx) => {
            const date = epochToDateTime(Timestamp);
            return (
            <a key={`${Slug}-${idx}`} href={`/articles/${Slug}`}>
              <div
                style={{
                  alignItems: 'center',
                  border: '1px solid gray',
                  borderRadius: '4px',
                  display: 'block',
                  textAlign: 'center',
                  padding: '40px 20px',
                  marginBottom: '15px'
                }}
              >
                <h2 style={{ fontSize: '24px', marginTop: '0' }}>{Title}</h2>
                <h3 style={{ fontSize: '18px' }}>{`By: ${Author}`}</h3>
                <p style={{ color: 'rgb(107 114 128)', fontSize: '16px', margin: '0' }}>{date}</p>
              </div>
            </a>
          )})}
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/articles');
  const data = await res.json();

  return {
    props: {
      articles: data
    },
    revalidate: 60,
  }
}

export default Home;
