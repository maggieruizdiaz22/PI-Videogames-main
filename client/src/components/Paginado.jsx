import React from "react";
import './Styles/Paginado.css'

export default function Paginado({videogamesPerPage, allVideogames, paginado,currentPage,setCurrentPage }){ // aca mostara cuantas paginas habra, depende de cuantos personajes voy a tener especifico nro de paginas

    const pageNumber=[];
for(let i=0; i< Math.ceil(allVideogames/videogamesPerPage); i++){ //6.67---> 7 
    pageNumber.push(i+1) 
}


function handlePrev(){
if(currentPage===1){
setCurrentPage(1)
    
}else{
setCurrentPage(currentPage-1)
}
}


    function handleNext() {
        if (currentPage === pageNumber[pageNumber.length - 1]) {
            setCurrentPage(currentPage);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }



return(
	<nav className="paginate-container">
			<div className='prev-next'>
				<button className="next-prev-btn" onClick={() => handlePrev()} disabled={allVideogames < 15}>prev</button>
			</div>
				<div className="pages">
					{allVideogames < 15 ? 
					<div key='pagination'> {paginado(1)}</div> : 
					pageNumber && pageNumber.map(n =>(
						<div className='page'>
							<button className={'page-number' + (n === currentPage ? 'active' : '')}  key={n} onClick={() => paginado(n)} >{n}</button>
						</div>
					))
					}
				</div>
				<div className='prev-next'>
					<button className="next-prev-btn" onClick={() => handleNext()} disabled={allVideogames < 15}>next</button>
				</div>
		</nav>
	)

}









//     <nav className="pagination">
//         <div className="prev-next">
//             <button className="next-prev-btn" onClick={()=>handlePrev()} disabled={allVideogames<15}>Prev</button>
//             </div>
//         <ul>
//             {pageNumber && pageNumber.map(number=>(
//                 <li className='number' key={number}>
//                     <button onClick={()=>paginado(number)}>{number}</button>
//                 </li>
//             ))}
//         </ul>
        
//     </nav>
// );
// }