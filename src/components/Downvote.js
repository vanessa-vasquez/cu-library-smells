import { React, useState } from 'react'
import { HandThumbsDown, HandThumbsDownFill } from 'react-bootstrap-icons';
import { ref, get, child, update } from "firebase/database";
import { database } from '../firebase.js'; 

export default function Downvote(props) {
  const [thumbsClicked, setThumbsClicked] = useState(false); 
  const library = props.library;
  const word = props.word;
  const descriptors = props.descriptors; 
  const setDescriptors = props.setDescriptors;

  const handleClick = (word) => {
    if (thumbsClicked){
      incrementLikes(word);
    } else {
      decrementLikes(word); 
    }

    setThumbsClicked(!thumbsClicked); 
  }

  const decrementLikes = (word) => {
    get(child(ref(database), `descriptors/${library}/${word}`)).then((snapshot) => {
      if (snapshot.exists()) {
        let likes = snapshot.val(); 

        let newDescriptors = {...descriptors}
        
        newDescriptors[word] = likes-1

        setDescriptors(newDescriptors); 

        update(ref(database, `descriptors/${library}`), {
          [word]: likes-1
        });
      } 
    }).catch((error) => {
      console.error(error);
    });
  }

  const incrementLikes = (word) => {
    get(child(ref(database), `descriptors/${library}/${word}`)).then((snapshot) => {
      if (snapshot.exists()) {
        let likes = snapshot.val(); 

        let newDescriptors = {...descriptors}
        
        newDescriptors[word] = likes+1

        setDescriptors(newDescriptors); 

        update(ref(database, `descriptors/${library}`), {
          [word]: likes+1
        });
      } 
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
      <button onClick={() => handleClick(word)}>{!thumbsClicked ? <HandThumbsDown /> : < HandThumbsDownFill />}</button>
  )
}