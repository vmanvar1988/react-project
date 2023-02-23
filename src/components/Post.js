import {useState,useEffect} from 'react';
import axios from 'axios';


function Post() {
	const [apiData,setApiData] = useState([]);
	const url = 'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001';
	
	
	
	useEffect(() => {
     getData();
	 console.log('useEffect------',apiData);
	   apiData.map((item)=>{
			console.log(item.id);
			})
  },[]);

	
	const getData = async() => {
	  await axios.get(url).then(res=>
	  {setApiData(res.data)});
	 
	}
	
	

  return (
    <div>
	 <table>
	 <thead>
	 <tr>
		<td>ID</td>
		<td>Name</td>
		<td>Email</td>
		<td>Phone</td>
		<td>DOB</td>
	 </tr>
	 </thead>
	 <tbody>
		 {apiData && apiData.map((item)=>(
			<tr>
			<td>{item.id}</td>
			<td>{item.firstName}</td>
			<td>{item.email}</td>
			<td>{item.contactNumber}</td>
			<td>{item.dob}</td>
			</tr>
		 ))}
	 </tbody>
	 </table>
    </div>
  );
}

export default Post;

