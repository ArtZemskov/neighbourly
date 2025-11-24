const features = [
  {
    title: 'Coordinate everyday neighbour help',
    description:
      'Ask for or offer small favours like collecting parcels, watering plants when someone is away, or lending tools to neighbours.',
  },
  {
    title: "Create local events or join neighbours' initiatives",
    description:
      'Browse upcoming events and join with one click so organisers know who is coming.',
  },
  {
    title: 'Keep everything in one place',
    description:
      'See all activities for your building in one simple timeline, instead of scattered chats.',
  },
  {
    title: 'Focus on your building first',
    description:
      'Limit events to residents of a single address to keep things safe, local, and relevant.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="mt-12 border-t border-zinc-800 pt-8">
      <h2 className="text-sm font-medium text-zinc-400">
        What you can do with Neighbourly
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="space-y-1">
            <h3 className="text-base font-semibold">{feature.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
