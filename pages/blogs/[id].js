import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Banner from "@/components/Banner";
import { Title, TitleSm } from "@/components/common/Title";

const SinglePost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        const foundPost = data.find((post) => post.id.toString() === id.toString()); // Ensure ID comparison works
        setPost(foundPost || null);
      })
      .catch((error) => console.error("Error fetching blog:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading blog...</p>;
  if (!post) return <p>Blog Not Found</p>;

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <section className="post-details bg-top">
        <div className="container">
          <div className="heading-title">
            <TitleSm title={`Category: ${post.category} / Date: ${post.date}`} />
            <br />
            <Title title={post.title} className="title-bg" />
            <div className="img py">
              <img src={post.cover} alt={post.title} width="100%" height="100%" className="round" />
            </div>
            <div className="desc">
              <TitleSm title={post.description1} />
              <p className="desc-p">{post.mainDescription1}</p>
            </div>
          </div>
          <Banner />
          <div className="heading-title">
            <div className="desc">
              <TitleSm title={post.description2} />
              <p className="desc-p">{post.mainDescription2}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SinglePost;
