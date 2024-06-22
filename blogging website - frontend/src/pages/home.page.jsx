import { useEffect, useState } from "react";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPostCard from "../components/blog-post.component";
import Loader from "../components/loader.component"; // Make sure you have a Loader component

const HomePage = () => {
    const [blogs, setBlogs] = useState(null);

    const fetchLatestBlogs = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
            .then(({ data }) => {
                setBlogs(data.blogs);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchLatestBlogs();
    }, []);

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-18">
                <div className="w-full">
                    <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
                        <>
                            {
                                blogs === null ? <Loader /> :
                                blogs.map((blog, i) => (
                                    <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                                        <BlogPostCard contetx={blog} author={blog.author.personal_info}/>
                                    </AnimationWrapper>
                                ))
                            }
                        </>
                    </InPageNavigation>
                </div>
                <div></div>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
