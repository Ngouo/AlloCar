import { useEffect, useState } from "react"
import CarItem from "./CarItem"

type Statut = "Vendu" | "En Négociation" | "En Stock"

type Voiture = {
    id : number,
    modele: string,
    imageUrl : string,
    prix : number,
    statut: Statut,
}



function App() {

  const [inputModele, setInputModele] = useState("")
  const [inputImageUrl, setInputImageUrl] = useState("")
  const [inputprix, setInputPrix] = useState(Number)
  const [statut, setSatut] = useState<Statut>("En Stock")
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'night');

  const savedCars = localStorage.getItem("cars")
  const InitialCars = savedCars ? JSON.parse(savedCars) : []
  const [cars, setCars] = useState<Voiture[]>(InitialCars)
  const [inputRecherche, setInputRecherche] = useState("")

  useEffect(() => {localStorage.setItem("cars", JSON.stringify(cars))
  }, [cars])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  function addCar() {
    if(inputModele.trim() == "" || inputImageUrl.trim() == ""){
      return 
    }

    const Car : Voiture = {
      id : Date.now(),
      modele : inputModele.trim(),
      imageUrl : inputImageUrl.trim(),
      prix : inputprix,
      statut: statut
    }

    const NewCars = [Car, ...cars]
    setCars(NewCars)
    setInputModele("")
    setInputImageUrl("")
    setInputPrix(0)
    setSatut("En Stock")
  }

 function ChangeTheme() {
    if (theme == 'night') {
      setTheme('light')
    } else {
      setTheme('night')
    }
  }

 

  /*const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInputImageUrl(e.target.files[0]);
    }
  }; */

  return (
    <div>
      <div className="lg:flex ">
        <div className="navbar bg-blue-500 shadow-sm fixed top-0 z-50 lg:w-165 w-90 left-1/2 -translate-x-1/2 mt-4 rounded-full">
          <div className="flex gap-1 ml-2">
            <p className="font-semibold text-dark text-3xl">
              AlloCar
            </p>
            <img src="./public/assets/voiture.png" width={35} height={35} alt="" />
          </div>
          <div className="flex gap-2 lg:ml-auto ml-auto">
            <input 
                  type="text" 
                  placeholder="Rechercher un article..." 
                  className="input w-25 mr-5 md:w-45 ml-auto"
                  value={inputRecherche}
                  onChange={(e) => setInputRecherche(e.target.value)}
            />
          
          </div>
        </div>

        <div className="grid grid-col-1 lg:pt-6  pt-15 ml-auto lg:flex">
            <button className="btn mt-6 lg:mt-1 sm:mt-0 mx-3 bg-blue-100 w-15 ml-auto" onClick={ChangeTheme}>
              <img src="./public/assets/day-mode.png" alt="" width={25} height={25} />
            </button>
        </div>

      </div>

      <div className="w-2/3 grid grid-col-1 my-10 mx-auto bg-base-300 p-8 round mt-10 lg:mt-20 ">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
                className="input w-full  border-1 border-sky-500"
                type="text"
                required
                placeholder="Entrez votre modèle"
                value={inputModele}
                onChange={(e) => setInputModele(e.target.value)}
                />
          <input 
                className="input w-full  border-1 border-sky-500"
                type="text"
                required
                placeholder="Entrez le Prix"
                value={inputprix}
                onChange={(e) => setInputPrix(Number(e.target.value))}
                />
          <input 
                className="input w-full border-sky-500"
                type="text"
                required
                value={inputImageUrl}
                placeholder="lien vers votre image"
                onChange={(e) => setInputImageUrl(e.target.value)}
          />
          <select 
                className="select w-full border-sky-500" 
                value={statut}
                onChange={(e) => setSatut(e.target.value as Statut)}
                >
             <option value="Vendu">Vendu</option>
            <option value="En Négociation">En Négociation</option>
            <option value="En Stock">En Stock</option>
          </select>

          <button className="btn btn-primary" onClick={addCar}>Ajouter</button>
        </div>        
      </div>

      
      <div className="container"> 
        <div className="grid grid-cols-2 mx-auto md:grid-cols-2 lg:grid-cols-3  gap-3">
            {cars.filter(car => car.modele.includes(inputRecherche)).map((car) => (
              <div key={car.id} className="">
                 <CarItem car={car} />
              </div>
            ))}       
      </div>
      </div>     
    </div>
  )
}

export default App
