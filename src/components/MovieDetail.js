import React, { useState, useEffect,useCallback } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState([]);
  const { id } = useParams();
	let navigate = useNavigate();
	useEffect(()=>{
		 getData();
	 },[setMovieDetail,movieDetail]);
	
  const getData = useCallback(async() => {
	  const url = "https://search.imdbot.workers.dev/?tt="+id;

    try {
		const response = await axios.get(url).then(res=>res.data.short);
		const data1 = [{ name:response.name, image:response.image, datePublished:response.datePublished, description:response.description, ratingValue:response.aggregateRating.ratingValue}];
		setMovieDetail(...movieDetail, data1);
		console.log(movieDetail);
			
	 } catch (error) {
		  console.log("error", error);
	  } 
  });
  
  
  return (
<Container>
      <h1>Movie Details <Button onClick={() => navigate(-1)}>Back</Button> </h1>
    
        <div>
	<Table striped bordered hover>
      <thead>
       
	 </thead>
	 
		 {movieDetail && 
		 <tbody>
			<tr>
				<td>Movie Name</td>
				<td>{(movieDetail.name)?movieDetail.name:''}</td>
			</tr>
			<tr>
				<td>Photo</td>
				<td>
					<img src={(movieDetail.image)?movieDetail.image:"https://th.bing.com/th/id/OIP.WyCZfDJICgOsDqaKddKWXQHaHa?pid=ImgDet&w=177&h=177&c=7"} height="100px" width="100px" />
				</td>
			</tr>
			 <tr>
				<td>Publish</td>
				<td>
					{(movieDetail.datePublished)?movieDetail.datePublished:''}
				</td>
			</tr>
			  <tr>
				<td>Description</td>
				<td>
					{(movieDetail.description)?movieDetail.description:''}
				</td>
			</tr>
			<tr>
				<td>Rating</td>
				<td>{(movieDetail.ratingValue)?movieDetail.ratingValue:''}</td>
			</tr>
			 </tbody>
		 }
	
	 </Table>
    </div>
    </Container>
  );
}
