import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Header from "../../components/Header";
import styled from "styled-components";
import Button from "../../components/Button";

export const getServerSideProps = async () => {
  // pageContext = the slug is the keyword for fetching in Sanity.

  const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  const query = encodeURIComponent(
    // This is GROQ language, similar to GraphQL.
    `*[_type == "post"]` // no slice specified --> all posts are returned
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

export default function Posts({ posts }) {
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

    h3 {
      color: var(--grey);
      margin: 0.313rem 0;
      font-size: var(--h3);
      font-family: var(--text);
    }
  `;

  return (
    <Fragment>
      <Head>
        <title>Joan Segovia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <h1>All the posts.</h1>
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
                    <Button text="Go to post" />
                  </a>
                </Link>
              </Post>
            ))
          ) : (
            <>
              <h2>No posts yet</h2>
            </>
          )}
        </RecentPosts>
      </main>

      <Link passHref href="/">
        <a>
          <Button text="Go back to start" />
        </a>
      </Link>
    </Fragment>
  );
}
