import { useEffect, useState } from "react";
import TextCard from './components/TextCard'

const alltext =  () => {

    const [textList, setTextList ] = useState([])
    const [id, setId ] = useState([])

    async function fetchText() {
        const textObj = await fetch('http://localhost:8080/home/alltext');
        
        return await textObj.json();
        
    }

    useEffect(() => {
        
        const fetchText = async () => {
          try {
            const textObj = await fetch('http://localhost:8080/home/alltext');
            const data = await textObj.json();
            // console.log("data is",data);
            const { 0: { _id, text } } = data;
            setTextList(text);
            setId(_id);
          } catch (error) {
            console.error('Error fetching text:', error);
          }
        };

        const fetchOne = async () => {

        }
       
        fetchText(); 
      }, []);

  //  const textMap = textList.map(text => <li key = {text._id}>
  //                                                 Text:  {text.text}: &nbsp;                                   
  //                                                   </li>)
  // let returningText = new Array();
  //   if ( textList.length > 0 )
  //    { returningText =  textList;}
    // console.log(returningText);


    // console.log(text);

    const array = [id, textList]

    return(<div>
        <h1>Data from Server</h1>
        
        <TextCard text={array} />
       
        {/* <ol>{textMap}</ol> */}
   
    </div>)
}

export default alltext;