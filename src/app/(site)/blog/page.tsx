import Link from "next/link";
import { PageSection } from "@/components/site/PageSection";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    posts = [];
  }

  return (
    <PageSection>
      <h1 className="flipbook__title flipbook__reveal">
        <span className="flipbook__title-accent">Блог</span>
      </h1>
      <p className="flipbook__lead flipbook__reveal flipbook__reveal--delay-1">
        Заметки о разработке, дизайне и запуске продуктов.
      </p>
      <div className="flipbook__grid">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <article
              key={post.id}
              className={`flipbook__card flipbook__reveal flipbook__reveal--delay-${Math.min(i + 1, 3)}`}
            >
              <h2 className="flipbook__card-title">{post.title}</h2>
              <p className="flipbook__card-text">{post.excerpt}</p>
              <span className="flipbook__tag">{post.slug}</span>
            </article>
          ))
        ) : (
          <article className="flipbook__card flipbook__reveal">
            <h2 className="flipbook__card-title">Первый пост скоро</h2>
            <p className="flipbook__card-text">
              Публикуйте статьи в{" "}
              <Link href="/admin/blog" className="text-[var(--webo-primary)]">
                админке
              </Link>
              .
            </p>
          </article>
        )}
      </div>
    </PageSection>
  );
}
