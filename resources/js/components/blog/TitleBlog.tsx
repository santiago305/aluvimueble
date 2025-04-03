import React from 'react';

interface TitleBlogProps {
    title: string;
}

const TitleBlog: React.FC<TitleBlogProps> = ({ title }) => {
    return (
        <h3 className="m-4 text-3xl md:text-5-l">
            <strong>
                {title}
            </strong>
        </h3>
    );
};

export default TitleBlog;