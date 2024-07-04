import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Buy food ingredients
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> from Hi Yogurt</span>
      </h1>
      <p className="desc text-center mt-5 font-merriweather">
        The premier way to buy Hi Yogurt Inventory and track it.
      </p>
      <Feed />
    </section>
  );
}
