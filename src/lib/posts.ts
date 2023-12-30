import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), "/src/pages/posts");

export type PostsDataType = {
  id: string,
  title: string,
  date: Date
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