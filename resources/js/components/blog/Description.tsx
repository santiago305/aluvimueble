import React from 'react';

interface DescriptionBlogProps {
    description: string;
}

const DescriptionBlog: React.FC<DescriptionBlogProps> = ({ description }) => {
    return (
        <p className="m-4 text-3xl mt-3 md:text-5-l">
            {description}
        </p>
    );
};

export default DescriptionBlog;