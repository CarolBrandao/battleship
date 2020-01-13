import React from 'react'


const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const initialStateShips = getShips()
export function GameBoard(){

	const [opened, setOpened] = React.useState([])
	const [sink, setSink] = React.useState([])
	const [reveal, setReveal] = React.useState(false)
	const [ships, setShips] = React.useState(initialStateShips)

	if(sink.length === ships.length && !reveal){
    alert('You won\n\n'+opened.length+" attempts\n"+sink.length+" hits")
    setReveal(true)
	}

	return (
		<React.Fragment>
			<button onClick={() => [setReveal(false), setOpened([]), setSink([]), setShips(getShips())]}>Start new game</button>
			<button disabled={reveal} onClick={() => setReveal(true)}>Revel all cells</button>
			<table>
				<tbody>
				{
					rows.map(row => (
						<tr key={row}>
						{
							cols.map(
	       				col => {
	       					const cell = `${row}${col}`
	       					const open = reveal || opened.includes(cell)
	       					const sinkShip = ships.includes(cell)
	       					
	       					return(
	       						<td 
	       							key={cell}
	       							className={open? sinkShip? 'sink' : 'open' : 'close'}  
	       							onClick={() => [setOpened([...opened, cell]), sinkShip && setSink([...sink, cell])]}
	       						/> 
	       					)
	       				}
	       			)
						}
						</tr>		
					)
				)
				}
				</tbody>
			</table>
		</React.Fragment>
	)
}

function getShips(){
	const shipsNumber = 6
	let shipSize = 2;
	let arrayCordinates = []

	for (let i=0;i<shipsNumber; i++){
		const rand_row = parseInt(getRandomArbitrary(0, rows.length), 10)
		const rand_col = parseInt(getRandomArbitrary(0, rows.length), 10)
		for (let j=0; j< shipSize; j++){
			switch( shipSize ){
				case 2: 
				case 5: 
					if(rand_row + shipSize <= rows.length){
						arrayCordinates.push(`${rows[rand_row + j]}${rand_col}`)	
					}else{
						arrayCordinates.push(`${rows[rand_row - j]}${rand_col}`)	
					}
					break;
				default:
					if(rand_col + shipSize <= cols.length){
						arrayCordinates.push(`${rows[rand_row]}${rand_col + j}`)	
					}else{
						arrayCordinates.push(`${rows[rand_row]}${rand_col - j}`)	
					}
					break;
			}
			
		}
		shipSize = parseInt(getRandomArbitrary(2, 5), 10)
	}

	return arrayCordinates
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}