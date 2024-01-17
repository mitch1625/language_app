import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CommentItem from './CommentItem';

const CardComponent = ({poster, postContent, languages, translation, postId, onClickHandler, post}) => {
    
    const translationHandler = (post) => {
        console.log(post)
        onClickHandler(post, postId)
    }
    
    
    return (
        <div className='post-component'>
        <Card className='post-card' key={postId}>
        <Card.Body>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Card.Title>{poster}</Card.Title>
            <Button className='translate-button' 
                onClick={()=>{
                    translationHandler(post)
                }}>
                <img src={"../src/assets/translate.png"} style={{height:'30px', width:'30px'}}/>
            </Button>
        </div>
            <Card.Subtitle className="mb-2 text-muted">{languages}</Card.Subtitle>
            <Card.Text>
                {postContent}
            </Card.Text>
            <Card.Text>
               {translation}  
            </Card.Text>
        </Card.Body>
        <CommentItem id={postId}/>
    </Card>
    </div>
    )
}

export default CardComponent
