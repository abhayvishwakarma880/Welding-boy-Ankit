export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Product: {params.slug}</h1>
    </div>
  );
}
