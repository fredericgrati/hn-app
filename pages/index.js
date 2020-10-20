import "react";
import dynamic from "next/dynamic";

import Head from "next/head";
import Nav from "../components/Nav";
import Table from "../components/Table";
import More from "../components/More";
const LineChart = dynamic(() => import("../components/LineChart"), {
  ssr: false,
});

import useHNStories from "../hooks/useHNStories";
import { getServerSideStories } from "../api/stories";

export const getServerSideProps = getServerSideStories;

function Home(props) {
  const [stories, handlers] = useHNStories(props.stories);
  const { onVote, onHide, onFetch, onTypeChange } = handlers;
  return (
    <div>
      <Head>
        <title>Hacker News</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="hacker news description" />
      </Head>

      <main>
        <div className="mx-auto ">
          <Nav onTypeChange={onTypeChange} />
          <Table stories={stories.data} onVote={onVote} onHide={onHide} />
          <More onFetch={onFetch} loading={stories.loading} />
          <LineChart stories={stories.data} />
        </div>
      </main>
    </div>
  );
}

export default Home;
