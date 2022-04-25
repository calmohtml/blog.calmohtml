import { Fragment, useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";

export const getServerSideProps = async () => {
  // pageContext = the slug is the keyword for fetching in Sanity.

  const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(
    // This is GROQ language, similar to GraphQL.
    `*[_type == "post"] | order(_createdAt desc)[0...3]` // first 3 posts (non-inclusive)
  );

  const url = `https://${projectID}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;
  // The URL where the content of Sanity.io is.

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!result.result || result.result.length === 0) {
      return {
        props: {
          posts: [],
        },
      };
    } else {
      return {
        props: {
          posts: result.result,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export default function Home({ posts }) {
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgCreator = imageUrlBuilder({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      });
      setMappedPosts(
        posts.map((post) => {
          return {
            ...post,
            mainImage: imgCreator.image(post.mainImage).width(310).height(290),
          };
        })
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  const RecentPosts = styled.section`
    @media (min-width: 320px) and (max-width: 768px) {
      margin-bottom: 0.688rem;
      grid-template-columns: 1fr;
    }

    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
    margin: 2rem 0px;
  `;

  const Post = styled.div`
    @media (min-width: 320px) and (max-width: 1024px) {
      width: auto;
      margin: 0.375rem 0;
      height: auto;
    }

    padding: 2.2rem;
    background: var(--light-blue);
    border: 0.2rem solid var(--white);
    border-radius: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.9) 6px 6px 0px;
    display: grid;
    grid-template-rows: 33% auto auto;

    h3 {
      color: var(--grey);
      margin: 0.313rem 0;
      font-size: var(--h3);
      font-family: var(--text);
    }
  `;

  const BackButton = styled.a`
    display: flex;
    justify-content: center;
    text-decoration: none;
  `;

  return (
    <Fragment>
      <Head>
        <meta name="description" content="Blog - Joan Segovia" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog - Joan Segovia</title>
      </Head>
      <Header />
      <main className="">
        <h1>Blog</h1>
        <p>Posts más recientes de Joan Segovia.</p>
        <RecentPosts>
          {mappedPosts.length ? (
            mappedPosts.map((post, index) => (
              <Post key={index}>
                <h3>{post.title}</h3>
                <Image
                  src={`${post.mainImage}`}
                  alt={`Image of ${post.title}`}
                  width={30}
                  height={30}
                  quality={100}
                  layout="responsive"
                  loading="lazy"
                />
                <Link passHref href={`/posts/${post.slug.current}`}>
                  <a>
                    <Button text="Ver post" />
                  </a>
                </Link>
              </Post>
            ))
          ) : (
            <>
              <h2>No se cargaron los posts :/</h2>
            </>
          )}
        </RecentPosts>
      </main>
      <Link passHref href="/posts">
        <BackButton>
          <Button text="Todos los posts" />
        </BackButton>
      </Link>
      <Footer />
    </Fragment>
  );
}
