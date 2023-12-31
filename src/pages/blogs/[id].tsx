import Layout from "@/components/Layout/layout";
import { PostsDataType, getAllPostIds, getPostData } from "@/lib/posts";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ComponentPropsWithoutRef } from "react";

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
      {props.postData.title}
      <br />
      {props.postData.id}
      <br />
      {props.postData.date.toString()}
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
    postData = getPostData(context.params.id);
  }

  return {
    props: {
      postData
    }
  }

}) satisfies GetStaticProps<BlogProps, BlogParams>