import Layout from "@/components/Layout/layout";
import { PostsDataType, getSortedPostsData } from "@/lib/posts";
import { ComponentPropsWithoutRef } from "react";
import utilStyles from "@/styles/utils.module.css"

interface BlogsProps extends ComponentPropsWithoutRef<"div"> {
  allPostsData: PostsDataType[]
}

export default function Blogs(props: BlogsProps) {
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          { props.allPostsData.map((data) => (
            <li className={utilStyles.listItem} key={data.id}>
              { data.title }
              <br />
              { data.id }
              <br />
              { data.date.toString() }
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}