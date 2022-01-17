import React,{} from 'react'

import { GlobalContext } from './context'

const Stories = () => {

    const { state, storyRemove } = GlobalContext();
    
    return (
        <div className='stories'>
            {state.loading
            ?   <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            : (state.hits.map(story => {
                const { title, url, points, objectID, num_comments, author } = story
                return (
                    <article key={objectID} className='py-3 px-4 my-3 bg-white rounded'>
                        <h3 className='fs-4'>{title}</h3>
                        <p className=''>{points} points by {author} | {num_comments} comments</p>
                        <div className='d-flex align-center'>
                            <a href={url} className='text-primary' target="_blank" rel='noopener noreferrer'>Read More</a>
                            <button className='mx-4 text-danger' onClick={(e) => storyRemove(objectID)}>Remove</button>
                        </div>
                    </article>
                )
            }))
            }
        </div>
    )
}

export default Stories
