// src/app/blog/[slug]/page.js
import { getPostBySlug } from '@/app/_blog/lib/posts';

const BlogPost = async ({ params }) => {
  const post = await getPostBySlug(`${params.slug}.md`); // Memanggil getPostBySlug dengan slug yang benar

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
};

export default BlogPost;
