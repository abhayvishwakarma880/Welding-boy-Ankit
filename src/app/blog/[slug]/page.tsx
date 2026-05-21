export default function BlogPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Blog: {params.slug}</h1>
    </div>
  );
}
