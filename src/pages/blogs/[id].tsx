import Layout from "@/components/Layout/layout";
import { PostsDataType, getAllPostIds, getPostData } from "@/lib/posts";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import DateComponent from '../../components/Date/date';
import utilStyles from "@/styles/utils.module.css"

interface BlogProps {
  postData: PostsDataType
}

interface BlogParams extends ParsedUrlQuery {
  id: string;
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export default function Blog(props: BlogProps) {
  return (
    <Layout>
      <Head>
        <title>{ props.postData.title }</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>
          { props.postData.title }
        </h1>
        <div className={utilStyles.lightText}>
          <DateComponent date={props.postData.date} />
        </div>
        {props.postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />}
      </article>
    </Layout>
  )
}

export const getStaticProps = (async (context) => {
  let postData: PostsDataType = {
    id: "0",
    title: "データが存在しない",
    date: new Date(),
  }
  if (context.params) {
    postData = await getPostData(context.params.id);
  }

  return {
    props: {
      postData
    }
  }

}) satisfies GetStaticProps<BlogProps, BlogParams>