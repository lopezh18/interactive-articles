import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import MultipleChoice from '../../components/MultipleChoice';
import Markdown from '../../components/Markdown';
import leftChevron from '../../public/left-chevron.svg';
import { iArticle } from '../../interface';

const ArticlePage:React.FC<iArticle> = ({ Author, Blocks, Title, ...restProps }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Interactive Article</title>
        <meta name="description" content="Co:rise interactive articles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '14px',
        }}
      >
        <button
          style={{
            alignSelf: 'start',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
          }}
          onClick={handleClick}
        >
          <Image alt='arrow back' src={leftChevron} height='60' />
          <p style={{ marginLeft: '10px' }}>Back To Home</p>
        </button>
        <h1 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '3px' }}>
          {Title}
        </h1>
        <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '7px' }}>
          {`By: ${Author}`}
        </h2>
        <div>
          {Blocks.map(({ Type: BlockType, Object }: { Type: string, Object: any }, idx) => {
            if (BlockType === "Markdown") {
              return (
                <div key={`${BlockType}-${idx}`}>
                  <Markdown Text={Object.Text} />
                  <hr style={{ margin: '16px 0'}} />
                </div>
              );
            } else if (BlockType === 'MCQ') {
              return (
                <div key={`${BlockType}-${idx}`}>
                  <MultipleChoice
                    {...Object}
                    {...restProps} />
                  <hr style={{ margin: '16px 0'}} />
                </div>
              );
            } else {
              return (
                <div key={`blank-${idx}`}>
                  <p> Type does not exist </p>
                  <hr style={{ margin: '16px 0'}} />
                </div>
              );
          }})}
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths= async () => {
  const res = await fetch('http://localhost:3000/api/articles');
  const data = await res.json();

  const paths = data.map(({ Slug }) => ({
    params: { articleSlug: Slug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/articles/${params.articleSlug}`);
  const data = await res.json();

  return {
    props: {
     ...data
    },
    revalidate: 60,
  }
}

export default ArticlePage;
