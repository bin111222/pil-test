import { TestimonialCard } from "@/components/ui";

const testimonials = [
  {
    title: "Perfect for My Baby's Skin!",
    quote:
      "I've been using the baby care range for my newborn, and I'm so impressed. The products are incredibly gentle yet effective. My baby's skin stays soft and rash-free. It's a relief to find something that truly works.",
    author: "Priya Sharma",
    category: "Baby Care",
    rating: 5,
  },
  {
    title: "Pain Relief Like Never Before!",
    quote:
      "I've tried countless pain management products, but nothing compares to this. The relief is almost instant, and I can go about my day without discomfort. It's become a daily essential in my routine.",
    author: "Ravi Patel",
    category: "Pain Management",
    rating: 5,
  },
  {
    title: "My Pet Has Never Looked Better",
    quote:
      "After just a few weeks of using the pet care products, my dog's coat is shinier and healthier than ever. I love knowing I'm using safe and natural products on him. The price is also within my budget.",
    author: "Meera Joshi",
    category: "Pet Care",
    rating: 5,
  },
  {
    title: "Revitalised My Hair & Scalp!",
    quote:
      "The hair care products have completely transformed my hair. My scalp feels nourished, and my hair is stronger and shinier. I can't imagine going back to my old products. This is what I have been looking for.",
    author: "Ananya Singh",
    category: "Hair Care",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-py bg-[var(--background)]">
      <div className="container">

        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="section-label mb-4">Testimonials</p>
          <h2 className="section-heading">
            Your Partner in
            <em className="not-italic text-[var(--primary)]"> Trusted Care</em>
          </h2>
          <div className="mx-auto mt-5 separator-gold" />
          <p className="mx-auto mt-5 max-w-md section-sub">
            Backed by science, proven by the families who trust us every day.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.title}
              title={t.title}
              quote={t.quote}
              author={t.author}
              category={t.category}
              rating={t.rating}
            />
          ))}
        </div>

        {/* Trust footnote */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <div className="flex items-center gap-2.5 text-sm text-[var(--muted)]">
            <svg className="h-4 w-4 text-[var(--accent)]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">4.9 / 5 average rating</span>
          </div>
          <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
          <span className="text-sm text-[var(--muted)]">10,000+ happy customers</span>
          <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
          <span className="text-sm text-[var(--muted)]">All reviews are verified purchases</span>
        </div>
      </div>
    </section>
  );
}
