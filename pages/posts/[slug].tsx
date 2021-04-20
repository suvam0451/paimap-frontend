import React from 'react'

function PostTemplate(props) {
  return <div>Here we'll load "{props.slug}"</div>
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query
  const content = await import(`../../markdown/${slug}.md`)
  return { slug }
}

export default PostTemplate