import React from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const blogData = [
    {
      title: "Top 10 Superfoods",
      image: "/Images/homeblog1.jpg",
      description: "Discover the healthiest foods you should eat daily.",
      link: "/blogs/superfoods",
    },
    {
      title: "Science of Effective Workouts",
      image: "/Images/homeblog2.jpg",
      description: "How science can make your workouts more effective.",
      link: "/blogs/workouts",
    },
    {
      title: "Hydration Myths",
      image: "/Images/homeblog3.jpg",
      description: "Debunking common myths about drinking water.",
      link: "/blogs/hydration",
    },
    {
      title: "Are you depressed?",
      image: "/Images/homeblog4.jpg",
      description: "Recognize the symptoms and seek the right help.",
      link: "/blogs/depression",
    },
  ];

  return (
    <section id="blogs" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4 text-success">
          Our Blogs
        </h2>
        <div className="row">
          {blogData.map((blog, index) => (
            <div key={index} className="col-md-3 mb-4">
              <Link to={blog.link} className="text-decoration-none text-dark">
                <div className="card blog-card shadow-sm p-3">
                  <div className="image-container">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="img-fluid blog-img"
                    />
                    <div className="overlay">
                      <p>{blog.description}</p>
                    </div>
                  </div>
                  <h5 className="mt-2">{blog.title}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
