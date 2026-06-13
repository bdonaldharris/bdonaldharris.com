import type { SpeakingTopic } from "@/content/speaking";

type SpeakingTopicCardProps = {
  topic: SpeakingTopic;
};

export function SpeakingTopicCard({ topic }: SpeakingTopicCardProps) {
  return (
    <article className="editorial-card topic-card">
      <h3>{topic.title}</h3>
      <p>{topic.description}</p>
    </article>
  );
}
