import Link from "next/link";
import { PageSection } from "@/components/site/PageSection";
import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageSection className="flipbook__page--scroll">
      <h1 className="flipbook__title flipbook__reveal">
        <span className="flipbook__title-accent">Блог</span>
      </h1>
      <p className="flipbook__lead flipbook__reveal flipbook__reveal--delay-1">
        Заметки о разработке, дизайне и запуске продуктов.
      </p>
      <div className="flipbook__grid">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`flipbook__card flipbook__card--blog flipbook__reveal flipbook__reveal--delay-${Math.min(i + 1, 3)}`}
            >
              <h2 className="flipbook__card-title">{post.title}</h2>
              <p className="flipbook__card-text">{post.excerpt}</p>
              {post.publishedAt && (
                <span className="flipbook__tag">{formatDate(post.publishedAt)}</span>
              )}
            </Link>
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
