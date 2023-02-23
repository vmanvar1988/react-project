import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieDetail from './MovieDetail';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function Movie() {
  const [fname, setFname] = useState("");
  const [responseData, setResponseData] = useState([]);
  
  const columns = [
    { dataField: 'IMDB_ID', text: 'Id' },
    { dataField: 'TITLE', text: 'Movie Name' },
    { dataField: 'IMG_POSTER', text: 'Picture', formatter: imageFormatter },
  ];
  
  function imageFormatter(cell, row) {
	  if(cell)
	  {
		  const img = (cell)?cell:"https://th.bing.com/th/id/OIP.WyCZfDJICgOsDqaKddKWXQHaHa?pid=ImgDet&w=177&h=177&c=7";
		   return (
		   <Link to={`/detail/${row.IMDB_ID}`}>
		   <img src={`${img}`} height='100px' width='100px' />
		  </Link>
		);
	  }
  }
  
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });
  
  const handleInputChange = (event) => {
    setFname(event.target.value);
  };
  
  const handleClick = async() => {
	  const url = "https://search.imdbot.workers.dev/?q="+fname;
		setFname("");
    try {
		const response = await axios.get(url).then(res=>res.data.description);
		
		if(response) {
			var allUsers = [];
			response.map((item,index)=>{
				let movie = {};
				Object.entries(item).map(obj => {
				   const key   = obj[0];
				   const value = obj[1];
				   if(key == '#TITLE') { movie['TITLE'] = value; }
				   if(key == '#IMG_POSTER') { movie['IMG_POSTER'] = value; }
				   if(key == '#IMDB_ID') { movie['IMDB_ID'] = value; }
				});
				allUsers.push(movie);
			});
			setResponseData(...responseData,allUsers);
			console.log(allUsers);
		}
	  } catch (error) {
		  console.log("error", error);
	  }
  }

  return (
    <Container>
      <h1>Search Movie</h1>
	  <div className="row">
		<div className="col-md">
			<Form.Control 
				type="text"
				placeholder="Search Movie"
				name="fname"
				value={fname}
				onChange={handleInputChange}
			 />
		</div>
		 <div className="col-md">
		   <Button onClick={handleClick}>Search</Button>
		 </div>
		 <div className="clearFix">&nbsp;</div>
		 <div className="col-lg">
		 {responseData &&
			<BootstrapTable keyField='id' data={responseData} columns={columns} pagination={pagination} />
		}
		 </div>
	</div>
		
    </Container>
  );
}
