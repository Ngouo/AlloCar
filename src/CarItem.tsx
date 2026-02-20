type Statut = "Vendu" | "En Négociation" | "En Stock"

type Voiture = {
    id : number,
    modele: string,
    imageUrl : string,
    prix : number,
    statut: Statut,
}

type Props = {
    car : Voiture;
}

const CarItem = ({car}: Props) => {
    return (
        <div className="mx-auto">
            <div className="card bg-base-100 lg:w-80 lg:h-75 w-45 h:25 mx-auto shadow-sm border-1 border-sky-500"> 
                <figure>            
                    <img className="lg:h-40 h-25 w-50 lg:object-cover lg:w-full" src= {car.imageUrl} alt={car.modele} /> 
                </figure>            
                <div className="card-body lg:h-20">
                    <h2 className="card-title font-bold text-xl">
                        {car.modele}
                    </h2>
                    <p className="font-bold text-50">{car.prix} FCFA</p>
                    <div className="card-actions justify-end">
                    <div className="font-bold border-1 rounded">{car.statut}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default CarItem