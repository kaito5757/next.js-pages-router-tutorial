import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostsDataType = {
  id: string,
  title: string,
  date: Date
}

export type AllPostIdsType = {
  params: {
    id: string,
  }
}

const postsDirectory = path.join(process.cwd(), "/src/pages/posts");

export const getAllPostIds = (): AllPostIdsType[] => {
  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.includes(".md"));

  // 各オブジェクトにparamsキーがないと、getStaticPathsでエラーが発生
  return fileNames.map(name => {
    return {
      params: {
        id: name.replace(/\.md$/, "")
      }
    }
  })
}

export const getPostData = (id: string): PostsDataType => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    title: matterResult.data["title"],
    date: matterResult.data["date"],
  }
}

export const getSortedPostsData = (): PostsDataType[] => {
  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.includes(".md"));
  const allPostsData = fileNames.map((fileName: string) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data["title"],
      date: matterResult.data["date"],
    }
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}