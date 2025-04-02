import React from 'react';

interface TitleBlogProps {
    title: string;
}

const TitleBlog: React.FC<TitleBlogProps> = ({ title }) => {
    return (
        <h3 className="text-3xl mt-3 md:text-5-l">
            <strong>
                {title}
            </strong>
        </h3>
    );
};

export default TitleBlog;