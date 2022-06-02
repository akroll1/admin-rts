import React, {useEffect} from 'react'

export const BlogArticle = ({article_id}) => {

    useEffect(() => {
        console.log('Article useEffect');
    },[]);
    return (
        <h1>Blog Article Page</h1>
    )
}