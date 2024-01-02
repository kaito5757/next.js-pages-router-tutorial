import Layout from "@/components/Layout/layout";
import { PostsDataType, getSortedPostsData } from "@/lib/posts";
import { ComponentPropsWithoutRef } from "react";
import utilStyles from "@/styles/utils.module.css"
import Link from "next/link";
import DateComponent from "@/components/Date/date"

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
              <Link href={`/blogs/${data.id}`}>
                { data.title }
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent date={data.date} />
              </small>
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