// src/app/blog/page.js
import { getPostSlugs, getPostData } from '@/app/_blog/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

const BlogList = async () => {
  const slugs = getPostSlugs();
  
  // Ambil data untuk setiap slug
  const posts = await Promise.all(slugs.map(slug => getPostData(slug)));

  return (
    <div>
      <div className="container mx-auto py-10">
        <Image
        src="https://images.unsplash.com/photo-1496867506859-2421b3d9a226?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={0}
        height={0}
        sizes="100%"
        className="w-full h-[280px] rounded-md object-cover"
        alt="Gambar Hero Section Tentang Kami"
      />
      <div className="mt-5">
         <h1 className="text-2xl font-semibold">Artikel Terbaru Dari Toolsz</h1>
         <div className="grid grid-cols-2 gap-5 mt-3">

         {posts.map(post => (
            <Link href={`/blog/${post.slug.replace('.md', '')}`} key={post.slug} className="border border-slate-500 hover:border-cyan-600 p-3 rounded-md">
               <h2 className="text-xl font-semibold">{post.title}</h2>
               <p className="text-sm line-clamp-1">{post.desc}</p>
            </Link>
         ))}
         </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
