import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

type MarkdownData = {
    slug: string,
    content: any,
    title?: string,
    author?: string
  }

/**
 * 
 * @param slug filename prefix for the markdown file
 * @param fields frontmatter to extract (also slug, content)
 * @returns 
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents) // data -> frontmatter

    let items : MarkdownData = {slug: realSlug, content: content}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        // Send back slug and content by default
        // if (field === 'slug')
        //     items[field] = realSlug
        // if (field === 'content')
        //     items[field] = content
        if (data[field])
            items[field] = data[field]
    })

    return items
}

/** Method to get all posts after custom sorting */
export function getAllPosts(fields: string[] = []) {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1: any, post2: any) => (post1.date > post2.date ? -1 : 1))
    return posts
}