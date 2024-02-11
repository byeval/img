import { GizmoList } from "@/ui/store/gizmo-list";
import GizmoTops from "@/ui/store/gizmo-tops";
import { searchGizmos } from "@/lib/api/gizmos";

const FAQs = [
  {
    title: "What is GPT?",
    description:
      'GPT stands for "Generative Pre-trained Transformer." It\'s a type of artificial intelligence model developed by OpenAI. GPT models, like GPT-3.5, are capable of understanding and generating human-like text based on the input provided to them. They have been trained on vast amounts of text data to learn patterns and generate coherent responses to various prompts.',
  },
  {
    title: "What is GPT Store?",
    description:
      "GPT Store is a place where you can discover and create custom versions of ChatGPT that combine instructions, extra knowledge, and any combination of skills.",
  },
  {
    title: "How can I submit my own custom GPTs?",
    description:
      "You can submit your own custom GPTs by creating a new account and following the instructions on the dashboard.",
  },
];

export default async function Store() {
  const gizmos = await searchGizmos({});

  return (
    <div className="mx-auto max-w-screen-xl overflow-x-clip px-4 lg:px-20">
      <div className="mt-12 mb-8">
        <h1 className="my-2 text-center text-3xl font-bold md:my-4 md:text-5xl">
          I'm GPT Store.
        </h1>
        <h1 className="text-token-text-secondary mx-auto w-full text-center text-sm font-light md:text-lg md:leading-tight">
          Discover and create custom versions of ChatGPT that combine
          instructions, extra knowledge, and any combination of skills.
        </h1>
      </div>
      <GizmoList items={gizmos} />
      <GizmoTops items={gizmos} />
      <div className="mt-12 flex flex-col justify-center">
        <div className="mb-5 text-xl font-medium md:text-2xl">
          Frequently asked questions
        </div>
        <div className="flex flex-col">
          {FAQs.map((faq) => (
            <details key={faq.title} className="mb-5">
              <summary className="md:text-md text-lg font-medium">
                {faq.title}
              </summary>
              <p className=" text-base font-normal text-gray-700 ">
                {faq.description}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
